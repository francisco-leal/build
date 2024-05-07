import { supabase } from "@/db";
import { getCurrentUser } from "./get-user";
import { unstable_cache } from "next/cache";

const getLeaderboardTop10 = unstable_cache(
  async () => {
    const { data: leaderboardData } = await supabase
      .from("boss_leaderboard")
      .select("*")
      .order("rank", { ascending: true })
      .limit(10)
      .throwOnError();

    return leaderboardData ?? [];
  },
  ["leaderboard_top_10"],
  { revalidate: 60 * 5 },
);

const getLeaderboardUser = unstable_cache(
  async (wallet: string) => {
    const { data: leaderboardData } = await supabase
      .from("boss_leaderboard")
      .select("*")
      .eq("wallet", wallet)
      .single();
    return leaderboardData;
  },
  ["leaderboard_user"],
  { revalidate: 60 * 5 },
);

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