"use server";

import { revalidatePath, unstable_cache } from "next/cache";
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
        .limit(10)
        .throwOnError();

      return leaderboardData ?? [];
    },
    ["leaderboard_top_10" satisfies CacheKey],
    { revalidate: CACHE_24_HOURS },
  )();
};

getLeaderboardTop10.bust = () => {
  revalidatePath("leaderboard_top_10" satisfies CacheKey);
};

const getLeaderboardUser = async (wallet: string) => {
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
    ["leaderboard_top_10" satisfies CacheKey],
    { revalidate: CACHE_24_HOURS },
  )();
};

getLeaderboardUser.bust = () => {
  revalidatePath("leaderboard_top_10" satisfies CacheKey);
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
