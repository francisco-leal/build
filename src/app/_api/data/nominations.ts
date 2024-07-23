"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { DateTime, Interval } from "luxon";
import { notifyBuildBot } from "@/app/_api/external/buildbot";
import { supabase } from "@/db";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { BadRequestError } from "@/shared/utils/error";
import {
  CacheKey,
  CACHE_1_MINUTE,
  CACHE_5_MINUTES,
} from "../helpers/cache-keys";
import { getCurrentUser, getUserBalances } from "./users";
import { User } from "./users";
import { WalletInfo, createWallet, getWalletFromExternal } from "./wallets";

export type Nomination = {
  id: number;
  buildPointsReceived: number;
  buildPointsSent: number;
  originUserId: string;
  originUsername: string;
  originPassportId?: number | null;
  originFarcasterId?: number | null;
  originWallet: string;
  originRank: number | null;
  destinationWallet: string;
  destinationUsername: string;
  destinationRank: number | null;
  createdAt: string;
};

const SELECT_NOMINATIONS_FROM_USER = `
  id,
  boss_points_sent,
  origin_user_id,
  origin_wallet_id,
  destination_wallet_id,
  created_at,
  wallets (
    username,
    users (
      id,
      username,
      boss_leaderboard (
        id,
        rank
      )
    ) 
  )       
` as const;

const SELECT_NOMINATIONS_TO_USER_SIMPLIFIED = `
  *,
  users (
    id,
    username,
    passport_id,
    farcaster_id,
    boss_leaderboard (
      id,
      rank
    )
  )
` as const;

export const getCurrentWeek = () => {
  let startOfWeek = DateTime.local()
    .startOf("week")
    .plus({ days: 1, hours: 9 });
  const now = DateTime.local();
  if (now < startOfWeek) {
    startOfWeek = startOfWeek.minus({ weeks: 1 });
  }
  const endOfWeek = DateTime.local().endOf("week").plus({ days: 1, hours: 9 });

  return { startOfWeek: startOfWeek.toISO(), endOfWeek: endOfWeek.toISO() };
};

export const getNomination = async (
  user: User,
  wallet: WalletInfo,
): Promise<Nomination | null> => {
  const userId = user.id;

  const nomination = await supabase
    .from("build_nominations_round_2")
    .select(SELECT_NOMINATIONS_FROM_USER)
    .eq("origin_user_id", userId)
    .eq("valid", true)
    .in("destination_wallet_id", wallet.allWallets)
    .throwOnError()
    .then((res) => res.data?.[0]);

  if (!nomination) return null;

  return {
    id: nomination.id,
    originUserId: nomination.origin_user_id,
    originUsername: user.username ?? "", // TODO: a default here should be redundant.
    originRank: user.boss_leaderboard?.rank ?? null,
    originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
    buildPointsReceived: 0,
    buildPointsSent:
      nomination.boss_points_sent > 0
        ? nomination.boss_points_sent
        : user.boss_budget / ((user.nominations_made ?? 0) + 1),
    destinationWallet: nomination.destination_wallet_id,
    destinationUsername:
      nomination.wallets?.users?.username ??
      nomination.wallets?.username ??
      abbreviateWalletAddress(nomination.destination_wallet_id),
    destinationRank: nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
    createdAt: nomination.created_at,
  };
};

export const getNominationThisWeek = async (
  user: User,
  wallet: WalletInfo,
): Promise<Nomination | null> => {
  const userId = user.id;
  const { startOfWeek, endOfWeek } = await getCurrentWeek();

  const nomination = await supabase
    .from("build_nominations_round_2")
    .select(SELECT_NOMINATIONS_FROM_USER)
    .eq("origin_user_id", userId)
    .eq("valid", true)
    .gte("created_at", startOfWeek)
    .lte("created_at", endOfWeek)
    .in("destination_wallet_id", wallet.allWallets)
    .throwOnError()
    .then((res) => res.data?.[0]);

  if (!nomination) return null;

  return {
    id: nomination.id,
    originUserId: nomination.origin_user_id,
    originUsername: user.username ?? "", // TODO: a default here should be redundant.
    originRank: user.boss_leaderboard?.rank ?? null,
    originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
    buildPointsReceived: 0,
    buildPointsSent: nomination.boss_points_sent,
    destinationWallet: nomination.destination_wallet_id,
    destinationUsername:
      nomination.wallets?.users?.username ??
      nomination.wallets?.username ??
      abbreviateWalletAddress(nomination.destination_wallet_id),
    destinationRank: nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
    createdAt: nomination.created_at,
  };
};

export const getNominationsUserSent = async (
  user: User,
): Promise<Nomination[]> => {
  return unstable_cache(
    async () => {
      const { data: nominations } = await supabase
        .from("build_nominations_round_2")
        .select(SELECT_NOMINATIONS_FROM_USER)
        .order("created_at", { ascending: false })
        .eq("origin_user_id", user.id)
        .eq("valid", true)
        .throwOnError();

      return (
        nominations?.map((nomination) => ({
          id: nomination.id,
          originUserId: user.id,
          originUsername: user.username ?? "", // TODO: a default here should be redundant.
          originRank: user.boss_leaderboard?.rank ?? null,
          originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
          buildPointsReceived: 0,
          buildPointsSent: nomination.boss_points_sent,
          destinationWallet: nomination.destination_wallet_id,
          destinationUsername:
            nomination.wallets?.users?.username ??
            nomination.wallets?.username ??
            abbreviateWalletAddress(nomination.destination_wallet_id) ??
            null,
          destinationRank:
            nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
          createdAt: nomination.created_at,
        })) ?? []
      );
    },
    [`nominations_sent_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};

export const getNominationsUserReceived = async (
  user: User,
): Promise<Nomination[]> => {
  return unstable_cache(
    async () => {
      const walletsForUser = user.wallets.map((w) => w.wallet);
      const nominations = await supabase
        .from("build_nominations_round_2")
        .select(SELECT_NOMINATIONS_TO_USER_SIMPLIFIED)
        .in("destination_wallet_id", walletsForUser)
        .eq("valid", true)
        .order("created_at", { ascending: false })
        .limit(10)
        .throwOnError()
        .then((res) => res.data ?? []);

      return (
        nominations?.map((nomination) => ({
          id: nomination.id,
          originUserId: nomination.origin_user_id,
          originUsername: nomination?.users?.username ?? "",
          originRank: nomination?.users?.boss_leaderboard?.rank ?? null,
          originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
          buildPointsReceived: 0,
          buildPointsSent: nomination.boss_points_sent,
          createdAt: nomination.created_at,
          destinationWallet: nomination.destination_wallet_id,
          destinationUsername:
            user.username ??
            abbreviateWalletAddress(nomination.destination_wallet_id), // not used
          destinationRank: user.boss_leaderboard?.rank ?? null, // not used
        })) ?? []
      );
    },
    [`nominations_received_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};

export const getNominationsFromUserToday = async (
  user: User,
): Promise<Nomination[]> => {
  const nominations = await getNominationsUserSent(user);
  const today = DateTime.local().startOf("day");
  const tomorrow = today.plus({ days: 1 });
  const interval = Interval.fromDateTimes(today, tomorrow);
  return nominations.filter((n) =>
    interval.contains(DateTime.fromISO(n.createdAt)),
  );
};

export const getNominationsFromUserThisWeek = async (
  user: User,
): Promise<Nomination[]> => {
  const nominations = await getNominationsUserSent(user);
  const { startOfWeek, endOfWeek } = await getCurrentWeek();

  const interval = Interval.fromDateTimes(
    DateTime.fromISO(startOfWeek),
    DateTime.fromISO(endOfWeek),
  );
  return nominations.filter((n) =>
    interval.contains(DateTime.fromISO(n.createdAt)),
  );
};

export const isSelfNomination = async (
  user: User,
  wallet: WalletInfo,
): Promise<boolean> => {
  const wallets = [...wallet.allWallets, ...user.wallets.map((w) => w.wallet)];
  const isSelfNomination = [...new Set(wallets)].length !== wallets.length;
  if (isSelfNomination) return true;
  if (user.farcaster_id === (wallet.farcasterId ?? false)) return true;
  if (user.passport_id === (wallet.passportId ?? false)) return true;
  return false;
};

export const isDuplicateNomination = async (user: User, wallet: WalletInfo) => {
  return !!(await getNomination(user, wallet));
};

export const isDuplicateNominationThisWeek = async (
  user: User,
  wallet: WalletInfo,
) => {
  return !!(await getNominationThisWeek(user, wallet));
};

export const hasExceededNominationsToday = async (nominatorUser: User) => {
  const nominations = await getNominationsFromUserToday(nominatorUser);
  return (nominations?.length || 0) >= 3;
};

export const hasNoDailyBudget = async (nominatorUser: User) => {
  return nominatorUser.boss_budget <= 0;
};

export const createNewNomination = async (
  nominatorUser: User,
  nominatedWallet: WalletInfo,
  origin_wallet_id: string,
  cast_id?: string,
): Promise<Nomination> => {
  const balances = await getUserBalances(nominatorUser, origin_wallet_id);

  if (await hasNoDailyBudget(nominatorUser)) {
    throw new BadRequestError("You need a BUILD budget to nominate!");
  }
  if (await isSelfNomination(nominatorUser, nominatedWallet)) {
    throw new BadRequestError("You cannot nominate yourself!");
  }
  if (await isDuplicateNominationThisWeek(nominatorUser, nominatedWallet)) {
    throw new BadRequestError("You already nominated this builder before!");
  }

  await createWallet(nominatedWallet.wallet);

  const amountOfNominations = nominatorUser?.nominations_made_current_week ?? 0;
  const points_sent = balances.budget / (amountOfNominations + 1);

  if (points_sent < 1) {
    throw new BadRequestError("You don't have enough budget to nominate!");
  }

  const nomination = await supabase
    .from("build_nominations_round_2")
    .insert({
      origin_user_id: nominatorUser.id,
      origin_wallet_id: origin_wallet_id,
      destination_wallet_id: nominatedWallet.wallet,
      boss_points_sent: points_sent,
      cast_id,
    })
    .select(SELECT_NOMINATIONS_FROM_USER)
    .single()
    .throwOnError()
    .then((res) => res.data);

  if (!nomination) throw new BadRequestError("Could not create nomination");

  await supabase.rpc("distribute_nomination_points", {
    origin_id: nominatorUser.id,
  });

  const { startOfWeek } = await getCurrentWeek();

  await supabase.rpc("update_nominations_made_and_weekly", {
    p_user_id: nominatorUser.id,
    p_week_start: startOfWeek,
  });

  if (nominatedWallet.userId) {
    await supabase.rpc("update_nominations_received", {
      p_user_id: nominatedWallet.userId,
      p_week_start: startOfWeek,
    });
  }

  revalidatePath(`/airdrop`);
  revalidatePath(`/airdrop/nominate/${nominatedWallet.wallet}`);
  revalidatePath(`/nominate/${nominatedWallet.wallet}`);
  revalidateTag(`user_${nominatorUser.id}` as CacheKey);
  revalidateTag(`nominations` as CacheKey);
  revalidateTag(`nominations_sent_${nominatorUser.id}` as CacheKey);

  if (nominatedWallet.userId) {
    revalidateTag(`user_${nominatedWallet.userId}` as CacheKey);
    revalidateTag(`nominations_received_${nominatedWallet.userId}` as CacheKey);
  }

  return {
    id: nomination.id,
    originUserId: nomination.origin_user_id,
    originUsername: nominatorUser.username ?? "", // TODO: a default here should be redundant.
    originRank: nominatorUser.boss_leaderboard?.rank ?? null,
    originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
    buildPointsReceived: 0,
    buildPointsSent: Math.round(nomination.boss_points_sent),
    destinationWallet: nomination.destination_wallet_id,
    destinationUsername:
      nomination.wallets?.users?.username ??
      abbreviateWalletAddress(nomination.destination_wallet_id),
    destinationRank: nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
    createdAt: nomination.created_at,
  };
};

export const createNewNominationForCurrentUser = async (
  walletToNominate: string,
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new BadRequestError("Could not find user");
  const walletInfo = await getWalletFromExternal(walletToNominate);
  if (!walletInfo) throw new BadRequestError("Could not find wallet info");
  return createNewNomination(currentUser, walletInfo, currentUser.wallet);
};

export const getNominationsCountOverall = async (): Promise<number> => {
  return unstable_cache(
    async () => {
      const { data: nominations, count } = await supabase
        .from("build_nominations_round_2")
        .select("id", { count: "exact", head: true });

      return count || 0;
    },
    ["nominations_count"] as CacheKey[],
    { revalidate: CACHE_1_MINUTE },
  )();
};

export const getTopNominationsForUser = async (
  user: User,
): Promise<Nomination[]> => {
  return unstable_cache(
    async () => {
      const wallets = user.wallets.map((w) => w.wallet);
      const nominations = await supabase
        .from("build_nominations_round_2")
        .select(SELECT_NOMINATIONS_TO_USER_SIMPLIFIED)
        .in("destination_wallet_id", wallets)
        .eq("valid", true)
        .order("boss_points_sent", { ascending: false })
        .limit(5)
        .throwOnError()
        .then((res) => res.data ?? []);

      return (
        nominations?.map((nomination) => ({
          id: nomination.id,
          originUserId: nomination.origin_user_id,
          originUsername: nomination?.users?.username ?? "",
          originPassportId: nomination?.users?.passport_id ?? null,
          originFarcasterId: nomination?.users?.farcaster_id ?? null,
          originRank: nomination?.users?.boss_leaderboard?.rank ?? null,
          originWallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
          buildPointsReceived: 0,
          buildPointsSent: nomination.boss_points_sent,
          destinationWallet: nomination.destination_wallet_id,
          destinationUsername:
            user.username ??
            abbreviateWalletAddress(nomination.destination_wallet_id),
          destinationRank: user.boss_leaderboard?.rank ?? null,
          createdAt: nomination.created_at,
        })) ?? []
      );
    },
    [`api_nominations_received_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};

export const getNominationsCountForUser = async (
  user: User,
): Promise<number> => {
  return unstable_cache(
    async () => {
      const wallets = user.wallets.map((w) => w.wallet);
      const nominationsCount = await supabase
        .from("build_nominations_round_2")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("valid", true)
        .in("destination_wallet_id", wallets)
        .throwOnError()
        .then((res) => res.count ?? 0);

      return nominationsCount;
    },
    [`count_nominations_received_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};

export const getNominationsWeeklyStatsForUser = async (
  user: User,
): Promise<{
  nominationsReceived: number;
  nominationsSent: number;
  pointsEarned: number;
}> => {
  return unstable_cache(
    async () => {
      const wallets = user.wallets.map((w) => w.wallet);
      const filterDate = DateTime.local().minus({ days: 7 }).toISO();
      const [nominationsReceived, nominationsSent] = await Promise.all([
        supabase
          .rpc("calculate_stats_received", {
            wallets_to_update: wallets,
            filter_date: filterDate,
          })
          .select("*")
          .single()
          .throwOnError()
          .then((res) => res.data),
        supabase
          .rpc("calculate_stats_sent", {
            user_id: user.id,
            filter_date: filterDate,
          })
          .select("*")
          .single()
          .throwOnError()
          .then((res) => res.data),
      ]);

      return {
        nominationsReceived: nominationsReceived?.nominations_received ?? 0,
        nominationsSent: nominationsSent?.nominations_made ?? 0,
        pointsEarned:
          (nominationsSent?.build_points_sent ?? 0) +
          (nominationsReceived?.build_points_received ?? 0),
      };
    },
    [`nominations_weekly_stats_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};
