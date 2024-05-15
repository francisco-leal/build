"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { DateTime, Interval } from "luxon";
import { supabase } from "@/db";
import { BadRequestError } from "@/shared/utils/error";
import { CacheKey } from "../helpers/cache-keys";
import { JobTypes } from "../helpers/job-types";
import { getCurrentUser, getUserBalances } from "./users";
import { User } from "./users";
import { WalletInfo, createWallet, getWalletFromExternal } from "./wallets";

export type Nomination = {
  id: number;
  bossPointsEarned: number;
  bossPointsGiven: number;
  originUserId: string;
  destinationWallet: string;
  destinationUsername: string | null;
  destinationRank: number | null;
  createdAt: string;
};

const SELECT_NOMINATIONS = `
  id,
  boss_points_received,
  boss_points_sent,
  origin_user_id,
  destination_wallet_id,
  created_at,
  wallets:destination_wallet_id (
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

export const getNomination = async (
  user: User,
  wallet: WalletInfo,
): Promise<Nomination | null> => {
  const userId = user.id;

  const nomination = await supabase
    .from("boss_nominations")
    .select(SELECT_NOMINATIONS)
    .eq("origin_user_id", userId)
    .in("destination_wallet_id", wallet.allWallets)
    .throwOnError()
    .then((res) => res.data?.[0]);

  if (!nomination) return null;

  return {
    id: nomination.id,
    originUserId: nomination.origin_user_id,
    bossPointsEarned: nomination.boss_points_received,
    bossPointsGiven: nomination.boss_points_sent,
    destinationWallet: nomination.destination_wallet_id,
    destinationUsername: nomination.wallets[0]?.users[0]?.username ?? null,
    destinationRank:
      nomination.wallets[0]?.users[0]?.boss_leaderboard?.rank ?? null,
    createdAt: nomination.created_at,
  };
};

export const getNominationsFromUser = async (
  user: User,
): Promise<Nomination[]> => {
  const { data: nominations } = await supabase
    .from("boss_nominations")
    .select(SELECT_NOMINATIONS)
    .order("created_at", { ascending: false })
    .eq("origin_user_id", user.id)
    .throwOnError();

  return (
    nominations?.map((nomination) => ({
      id: nomination.id,
      originUserId: nomination.origin_user_id,
      bossPointsEarned: nomination.boss_points_received,
      bossPointsGiven: nomination.boss_points_sent,
      destinationWallet: nomination.destination_wallet_id,
      destinationUsername: nomination.wallets[0]?.users[0]?.username ?? null,
      destinationRank:
        nomination.wallets[0]?.users[0]?.boss_leaderboard?.rank ?? null,
      createdAt: nomination.created_at,
    })) ?? []
  );
};

export const getNominationsFromUserToday = async (user: User) => {
  const nominations = await getNominationsFromUser(user);
  const fromDate = DateTime.utc().startOf("day");
  const toDate = fromDate.plus({ hours: 24 });
  const interval = Interval.fromDateTimes(fromDate, toDate);
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

export const isUpdatingLeaderboard = async () => {
  const { data: updates } = await supabase
    .from("scheduled_updates")
    .select("*")
    .is("finished_at", null)
    .eq("job_type", "leaderboard" satisfies JobTypes);

  if (!updates) return true;
  if (updates.length > 0) return true;
  return false;
};

export const isDuplicateNomination = async (user: User, wallet: WalletInfo) => {
  return !!(await getNomination(user, wallet));
};

export const hasExceededNominationsToday = async (nominatorUser: User) => {
  const nominations = await getNominationsFromUserToday(nominatorUser);
  return (nominations?.length || 0) >= 3;
};

export const createNewNomination = async (
  nominatorUser: User,
  nominatedWallet: WalletInfo,
): Promise<Nomination> => {
  if (await isSelfNomination(nominatorUser, nominatedWallet)) {
    throw new BadRequestError("You cannot nominate yourself!");
  }
  if (await isDuplicateNomination(nominatorUser, nominatedWallet)) {
    throw new BadRequestError("You already nominated this builder before!");
  }
  if (await hasExceededNominationsToday(nominatorUser)) {
    throw new BadRequestError("You have already nominated 3 builders today!");
  }
  if (await isUpdatingLeaderboard()) {
    throw new BadRequestError(
      "Leaderboard is currently updating, please try again later!",
    );
  }

  await createWallet(nominatedWallet.wallet);

  const balances = await getUserBalances(nominatorUser);

  const nomination = await supabase
    .from("boss_nominations")
    .insert({
      origin_user_id: nominatorUser.id,
      destination_wallet_id: nominatedWallet.wallet,
      boss_points_received: balances.pointsEarned,
      boss_points_sent: balances.pointsGiven,
    })
    .select(SELECT_NOMINATIONS)
    .single()
    .throwOnError()
    .then((res) => res.data);

  if (!nomination) throw new BadRequestError("Could not create nomination");

  await supabase.rpc("update_boss_daily_streak_for_user", {
    user_to_update: nominatorUser.id,
  });

  await supabase.rpc("update_boss_score_for_user", {
    user_to_update: nominatorUser.id,
  });

  await supabase.rpc("update_boss_score_for_user", {
    user_to_update: nominatedWallet.userId ?? "explode",
  });

  revalidatePath(`/airdrop`);
  revalidatePath(`/airdrop/nominate/${nominatedWallet.wallet}`);
  revalidatePath(`/nominate/${nominatedWallet.wallet}`);
  revalidateTag(`user_${nominatorUser.id}` as CacheKey);
  revalidateTag(`user_${nominatedWallet.userId}` as CacheKey);
  revalidateTag(`nominations` as CacheKey);
  return {
    id: nomination.id,
    originUserId: nomination.origin_user_id,
    bossPointsEarned: nomination.boss_points_received,
    bossPointsGiven: nomination.boss_points_sent,
    destinationWallet: nomination.destination_wallet_id,
    destinationUsername: nomination.wallets[0]?.users[0]?.username ?? null,
    destinationRank:
      nomination.wallets[0]?.users[0]?.boss_leaderboard?.rank ?? null,
    createdAt: nomination.created_at,
  };
};

export const createNewNominationForCurrentUser = async (
  walletToNominate: string,
) => {
  const currentUser = await getCurrentUser();
  const walletInfo = await getWalletFromExternal(walletToNominate);
  if (!currentUser) throw new BadRequestError("Could not find user");
  if (!walletInfo) throw new BadRequestError("Could not find wallet info");
  return createNewNomination(currentUser, walletInfo);
};