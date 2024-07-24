"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { TableLeaderboardValue } from "../../_components/table-leaderboard";
import { getCurrentUser } from "../data/users";
import { CacheKey } from "../helpers/cache-keys";

const getLeaderboardTop50 = unstable_cache(async () => {
  const { data: leaderboardData } = await supabase
    .from("users")
    .select("*")
    .order("boss_score", { ascending: false })
    .order("passport_builder_score", { ascending: false })
    .gt("nominations_received", 0)
    .limit(50)
    .throwOnError();

  return leaderboardData ?? [];
}, ["leaderboard_top_50" satisfies CacheKey]);

export const getTableLeaderboardValues = async (): Promise<
  TableLeaderboardValue[]
> => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardTop50();
  const containsUser = leaderboard.some((l) => l.id === user?.id);

  if (!containsUser && user?.boss_leaderboard) {
    leaderboard.push({
      ...user,
    });
  }

  return leaderboard.map((entry, index) => ({
    id: entry.id.toString(),
    name: entry.username ?? entry.last_wallet ?? "---",
    highlight: entry.id === user?.id,
    builderScore: entry.passport_builder_score,
    bossScore: entry.boss_score,
    nominationsReceived: entry.nominations_received ?? 0,
    rank: (index + 1).toString() ?? "---",
    farcasterId: entry.farcaster_id ?? null,
    passportId: entry.passport_id ?? null,
    walletAddress: entry.last_wallet ?? null,
    farcasterPowerUser: entry.farcaster_power_user ?? false,
  }));
};
