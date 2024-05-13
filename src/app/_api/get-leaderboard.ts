"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { getCurrentUser } from "./get-user";
import { CACHE_24_HOURS, CacheKey } from "./helpers/cache-keys";

const getLeaderboardTop10 = () => {
  return unstable_cache(
    async () => {
      const { data: leaderboardData } = await supabase
        .from("boss_leaderboard")
        .select("*")
        .order("rank", { ascending: true })
        .order("passport_builder_score", { ascending: false })
        .limit(10)
        .throwOnError();

      return leaderboardData ?? [];
    },
    ["leaderboard" satisfies CacheKey],
    { revalidate: CACHE_24_HOURS },
  )();
};

const getLeaderboardUser = async (wallet: string) => {
  if (!wallet) return null;

  const walletLc = wallet.toLowerCase();

  return await unstable_cache(
    async () => {
      const { data: leaderboardData } = await supabase
        .from("boss_leaderboard")
        .select("*")
        .eq("wallet", walletLc)
        .single();

      return leaderboardData;
    },
    ["leaderboard" satisfies CacheKey, `user_${walletLc}` satisfies CacheKey],
    { revalidate: CACHE_24_HOURS },
  )();
};

export const getLeaderboard = async () => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardTop10();
  const containsUser = leaderboard.some((l) => l.wallet === user?.wallet);

  if (!containsUser && user?.wallet) {
    const currentUserData = await getLeaderboardUser(user.wallet);
    if (currentUserData) leaderboard.push(currentUserData);
  }

  return leaderboard;
};
