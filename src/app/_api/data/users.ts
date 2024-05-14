"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { getSession } from "@/services/authentication/cookie-session";
import { getBalance } from "@/services/boss-tokens";
import { getFarcasterUser } from "@/services/farcaster";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

type Tables = Database["public"]["Tables"];

const SELECT_USERS = "*, wallets(*), boss_leaderboard(*)" as const;

export type Wallet = Tables["wallets"]["Row"];
export type RawUser = Tables["users"]["Row"];
export type Leaderboard = Tables["boss_leaderboard"]["Row"];

export type PartialWallet = Partial<Wallet> & Pick<Wallet, "wallet">;

export type User = RawUser & {
  wallets: Wallet[];
  boss_leaderboard: Leaderboard | null;
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
  return getUserFromId(userId);
};

export const getUserBalances = async (user: User) => {
  return {
    dailyBudget: user.boss_budget,
    pointsGiven: user.boss_budget * 0.9,
    pointsEarned: user.boss_budget * 0.1,
    totalPoints: user.boss_score + user.boss_budget * 0.1,
  };
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  if (!user) return null;
  return getUserFromId(user.userId);
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
    ...(farcasterUser?.allWallets ?? []).map((w) => ({
      wallet: w,
      farcaster_id: farcasterUser?.profileTokenId,
    })),
  ];

  const existingWallets = await supabase
    .from("wallets")
    .select("user_id")
    .in("wallet", allWallets)
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
    manifesto_nft_token_id: await hasMintedManifestoNFT(walletLc),
    boss_budget: 0,
    boss_score: 0,
    passport_builder_score: talentUser?.score ?? 0,
    boss_token_balance: await getBalance(walletLc),
    boss_nomination_streak: 0,
    farcaster_id: farcasterUser?.profileTokenId ?? null,
    passport_id: talentUser?.passport_id ?? null,
  };

  const user = await supabase
    .from("users")
    .insert(newUser)
    .throwOnError()
    .select(SELECT_USERS)
    .then((res) => res.data?.[0]);

  if (!user) throw new Error("User creation failed");

  await supabase.rpc("calculate_boss_budget_user", {
    user_to_update: user.id,
  });

  return user;
};

export const connectUserToWallets = async (user: User, wallet: string) => {
  const walletLc = wallet.toLowerCase();
  const talentUser = await getTalentProtocolUser(walletLc);
  const farcasterUser = await getFarcasterUser(walletLc);

  const existingWallets = await supabase
    .from("wallets")
    .select("wallet, farcaster_id, passport_id, user_id")
    .eq("user_id", user.id)
    .throwOnError()
    .then((res) => res.data);

  const allWallets: PartialWallet[] = [
    ...(existingWallets ?? []),
    ...(talentUser?.verified_wallets ?? []).map((w) => ({
      wallet: w,
      passport_id: talentUser?.passport_id,
      user_id: user.id,
    })),
    ...(farcasterUser?.allWallets ?? []).map((w) => ({
      wallet: w,
      farcaster_id: farcasterUser?.profileTokenId,
      user_id: user.id,
    })),
  ].reduce<PartialWallet[]>((acc, w) => {
    const index = acc.findIndex((e) => e.wallet === w.wallet);
    if (index === -1) {
      acc.push(w);
    } else {
      acc[index] = { ...acc[index], ...w };
    }
    return acc;
  }, []);

  await supabase
    .from("wallets")
    .upsert(allWallets.map((w) => ({ ...w })))
    .throwOnError();
};
