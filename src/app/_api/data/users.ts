"use server";

import { revalidateTag, revalidatePath, unstable_cache } from "next/cache";
import { DateTime } from "luxon";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { getSession } from "@/services/authentication/cookie-session";
import { getBalance } from "@/services/boss-tokens";
import { BadRequestError } from "@/shared/utils/error";
import { getFarcasterUser } from "../external/farcaster";
import { getTalentProtocolUser } from "../external/talent-protocol";
import {
  CACHE_5_MINUTES,
  CacheKey,
  CACHE_1_MINUTE,
} from "../helpers/cache-keys";

type Tables = Database["public"]["Tables"];

const SELECT_USERS = "*, wallets(*)" as const;

export type Wallet = Tables["wallets"]["Row"];
export type RawUser = Tables["users"]["Row"];
export type AirdropInfo = Tables["airdrop"]["Row"];

export type PartialWallet = Partial<Wallet> & Pick<Wallet, "wallet">;

export type User = RawUser & {
  wallets: Wallet[];
};

export type CurrentUser = User & {
  /** The wallet the user authenticated with for this session */
  wallet: string;
};

export const calculateUserBudget = async (user: User, wallet: string) => {
  const passport = await getTalentProtocolUser(wallet);
  const tokenAmount = await getBalance(wallet);
  if (user.build_commit_amount <= 0) {
    if (!passport || tokenAmount < 10_000_000) {
      throw new BadRequestError(
        "You must have a Talent Passport with humanity verification or over 10M $BUILD tokens in your wallet!",
      );
    }
    if (!passport.verified || tokenAmount < 10_000_000) {
      throw new BadRequestError(
        "You must have a Talent Passport with humanity verification or over 10M $BUILD tokens in your wallet!",
      );
    }
  }

  const builderScore = passport?.score ?? 0;

  const budget =
    (builderScore >= 40 ? builderScore * 40 : 0) +
    (tokenAmount > 1 ? Math.sqrt(0.01 * tokenAmount) : 0) +
    (user.build_commit_amount >= 1
      ? Math.sqrt(0.05 * user.build_commit_amount)
      : 0);

  await supabase
    .from("users")
    .update({
      passport_builder_score: builderScore,
      boss_budget: budget,
      boss_token_balance: tokenAmount,
      last_budget_calculation: new Date().toISOString(),
    })
    .eq("id", user.id)
    .throwOnError();

  return budget;
};

export const getUserFromId = async (userId: string): Promise<User | null> => {
  return unstable_cache(
    async (id: string) => {
      const userInfo = await supabase
        .from("users")
        .select(SELECT_USERS)
        .eq("id", id)
        .throwOnError()
        .then((res) => res.data?.[0]);
      return userInfo ?? null;
    },
    [`user_${userId}`, "leaderboard"] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(userId);
};

export const getUserFromWallet = async (
  wallet: string,
): Promise<User | null> => {
  const walletLc = wallet.toLowerCase();
  const userId = await supabase
    .from("wallets")
    .select("user_id")
    .eq("wallet", walletLc)
    .throwOnError()
    .then((res) => res.data?.[0]?.user_id);
  if (!userId) return null;

  return await getUserFromId(userId);
};

export const getUserBalances = async (user: User, wallet: string) => {
  let user_budget = user.boss_budget;
  const today = DateTime.local().startOf("day");
  const lastUpdateOfBudget = DateTime.fromISO(
    user.last_budget_calculation ?? "1970-01-01T00:00:00.000Z",
  );
  const shouldUpdateBudget =
    !user.last_budget_calculation ||
    today.diff(lastUpdateOfBudget, "days").days > 0;

  if (shouldUpdateBudget) {
    user_budget = await calculateUserBudget(user, wallet);
    user.boss_budget = user_budget;
    revalidatePath(`/stats`);
    revalidateTag(`user_${user.id}`);
  }

  return {
    budget: user_budget,
  };
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const user = await getSession();
  if (!user) return null;
  const userFromID = await getUserFromId(user.userId);
  return userFromID ? { ...userFromID, wallet: user.wallet } : null;
};

export const getAirdropInfoForCurrentUser =
  async (): Promise<AirdropInfo | null> => {
    const user = await getCurrentUser();
    if (!user) return null;

    try {
      return await supabase
        .from("airdrop")
        .select("*")
        .eq("user_id", user.id)
        .single()
        .throwOnError()
        .then((res) => res.data);
    } catch {
      return null;
    }
  };

export const getAirdropRankForUser = async (
  user: User | null,
): Promise<{ rank: Tables["airdrop"]["Row"]["rank"] } | null> => {
  if (!user) return null;

  try {
    return await supabase
      .from("airdrop")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .throwOnError()
      .then((res) => res.data);
  } catch {
    return null;
  }
};

export const createNewUserForWallet = async (wallet: string): Promise<User> => {
  const walletLc = wallet.toLowerCase();
  const talentUser = await getTalentProtocolUser(walletLc);
  const farcasterUser = await getFarcasterUser(walletLc);

  const allWallets: PartialWallet[] = [
    ...(talentUser?.verified_wallets ?? []).map((w) => ({
      wallet: w,
      passport_id: talentUser?.passport_id,
    })),
    ...(farcasterUser?.verified_addresses?.eth_addresses ?? []).map((w) => ({
      wallet: w,
      farcaster_id: farcasterUser?.fid,
    })),
  ];

  const existingWallets = await supabase
    .from("wallets")
    .select("user_id")
    .in(
      "wallet",
      allWallets.map((w) => w.wallet),
    )
    .throwOnError()
    .then((res) => res.data);

  const userId = existingWallets?.find((w) => w.user_id)?.user_id;
  if (userId) {
    const user = await getUserFromId(userId);
    if (!user) throw new Error("User creation failed");
    return user;
  }

  const newUser: Omit<RawUser, "created_at" | "id"> = {
    username: farcasterUser?.username ?? talentUser?.user?.username ?? walletLc,
    boss_budget: 0,
    boss_score: 0,
    passport_builder_score: talentUser?.score ?? 0,
    farcaster_id: farcasterUser?.fid ?? null,
    passport_id: talentUser?.passport_id ?? null,
    last_wallet: walletLc,
    last_budget_calculation: null,
    farcaster_power_user: farcasterUser?.power_badge ?? false,
    build_commit_amount: 0,
    boss_token_balance: 0,
    nominations_made: 0,
    nominations_made_current_week: 0,
    nominations_received: 0,
    nominations_received_current_week: 0,
  };

  const user = await supabase
    .from("users")
    .insert(newUser)
    .throwOnError()
    .select(SELECT_USERS)
    .then((res) => res.data?.[0]);

  if (!user) throw new Error("User creation failed");

  allWallets.forEach((w) => revalidatePath(`wallet_info_${w.wallet}`));
  return user;
};

export const getUsersCountOverall = async (): Promise<number> => {
  return unstable_cache(
    async () => {
      const { data: users, count } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true })
        .or("build_commit_amount.gt.1,nominations_made.gte.1");

      return count || 43451;
    },
    ["users_count"] as CacheKey[],
    { revalidate: CACHE_1_MINUTE },
  )();
};

export const getAPIUser = async (wallet: string): Promise<User | null> => {
  return unstable_cache(
    async (wallet: string) => {
      return await getUserFromWallet(wallet);
    },
    [`api_user_${wallet}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(wallet);
};
