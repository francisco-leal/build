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
        .select("*, users(farcaster_id, passport_id")
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

const getLeaderboardUndiscoveredBuilders = () => {
  return unstable_cache(
    async () => {
      const { data: leaderboardData } = await supabase
        .from("boss_leaderboard")
        .select("*, users(farcaster_id, passport_id)")
        .gt("nominations_received", 1)
        .lt("nominations_received", 4)
        .gt("passport_builder_score", 10)
        .gt("boss_score", 6000)
        .order("boss_score", { ascending: false })
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
  const leaderboard = await getLeaderboardUndiscoveredBuilders();
  const containsUser = leaderboard.some((l) => l.user_id === user?.id);

  if (!containsUser && user?.boss_leaderboard) {
    leaderboard.push({
      ...user.boss_leaderboard,
      users: { farcaster_id: null, passport_id: null },
    });
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
      farcaster_id: entry.users?.farcaster_id ?? undefined,
      passport_id: entry.users?.passport_id ?? undefined,
    }));
};
