"use server";

import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";
import { COINVISE_NFT_TOKEN_HOLDERS_SNAPSHOT } from "@/config/coinvise-wallets";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { getSession } from "@/services/authentication/cookie-session";
import { hasMintedManifestoNFT } from "@/services/manifesto-nft";
import { getFarcasterUser } from "../external/farcaster";
import { getTalentProtocolUser } from "../external/talent-protocol";
import {
  CACHE_5_MINUTES,
  CacheKey,
  CACHE_1_MINUTE,
} from "../helpers/cache-keys";

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

export type CurrentUser = User & {
  /** The wallet the user authenticated with for this session */
  wallet: string;
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

export const getUserBalances = async (user: User) => {
  return {
    dailyBudget: user.boss_budget,
    pointsGiven: user.boss_budget * 0.9,
    pointsEarned: user.boss_budget * 0.1,
    totalPoints: user.boss_score + user.boss_budget * 0.1,
  };
};

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  const user = await getSession();
  if (!user) return null;
  const userFromID = await getUserFromId(user.userId);
  return userFromID ? { ...userFromID, wallet: user.wallet } : null;
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
    boss_nomination_streak: 0,
    farcaster_id: farcasterUser?.fid ?? null,
    passport_id: talentUser?.passport_id ?? null,
    coinvise_nft: COINVISE_NFT_TOKEN_HOLDERS_SNAPSHOT[walletLc],
  };

  const user = await supabase
    .from("users")
    .insert(newUser)
    .throwOnError()
    .select(SELECT_USERS)
    .then((res) => res.data?.[0]);

  if (!user) throw new Error("User creation failed");

  await supabase
    .from("boss_leaderboard")
    .insert({
      user_id: user.id,
      rank: null,
      boss_score: user.boss_score,
      passport_builder_score: user.passport_builder_score,
      username: user.username ?? walletLc,
      nominations_received: 0,
    })
    .throwOnError();

  allWallets.forEach((w) => revalidatePath(`wallet_info_${w.wallet}`));
  return user;
};

export const getUsersCountOverall = async (): Promise<number> => {
  return unstable_cache(
    async () => {
      const { data: users, count } = await supabase
        .from("users")
        .select("id", { count: "exact", head: true });

      return count || 0;
    },
    ["users_count"] as CacheKey[],
    { revalidate: CACHE_1_MINUTE },
  )();
};
