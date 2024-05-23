"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { TableLeaderboardValue } from "../../_components/table-leaderboard";
import { getCurrentUser } from "../data/users";
import { CacheKey } from "../helpers/cache-keys";

const getLeaderboardUndiscoveredBuilders = unstable_cache(async () => {
  const { data: leaderboardData } = await supabase
    .from("boss_leaderboard")
    .select("*, users(farcaster_id, passport_id, last_wallet)")
    .gt("nominations_received", 1)
    .lt("nominations_received", 4)
    .gt("passport_builder_score", 10)
    .gt("boss_score", 6000)
    .order("boss_score", { ascending: false })
    .limit(10)
    .throwOnError();

  return leaderboardData ?? [];
}, ["leaderboard_undiscovered" satisfies CacheKey]);

export const getTableUndiscoveredBuildersValues = async (): Promise<
  TableLeaderboardValue[]
> => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardUndiscoveredBuilders();

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
      farcasterId: entry.users?.farcaster_id ?? null,
      passportId: entry.users?.passport_id ?? null,
      walletAddress: entry.users?.last_wallet ?? null,
    }));
};
