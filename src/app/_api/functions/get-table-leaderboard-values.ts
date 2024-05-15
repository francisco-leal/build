"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { TableLeaderboardValue } from "../../_components/table-leaderboard";
import { getCurrentUser } from "../data/users";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

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
    { revalidate: CACHE_5_MINUTES },
  )();
};

export const getTableLeaderboardValues = async (): Promise<
  TableLeaderboardValue[]
> => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardTop10();
  const containsUser = leaderboard.some((l) => l.user_id === user?.id);

  if (!containsUser && user?.boss_leaderboard) {
    leaderboard.push(user.boss_leaderboard);
  }

  return leaderboard
    .filter((v) => !!v.id)
    .map((entry) => ({
      id: entry.id.toString(),
      name: entry.username,
      highlight: entry.user_id === user?.id,
      builderScore: entry.passport_builder_score,
      bossScore: entry.boss_score,
      nominationsReceived: entry.nominations_received,
      rank: entry.rank?.toString() ?? "---",
    }));
};
