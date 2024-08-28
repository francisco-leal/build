"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { TableLeaderboardValue } from "../../_components/table-leaderboard";
import { getCurrentUser } from "../data/users";
import { CACHE_24_HOURS, CacheKey } from "../helpers/cache-keys";

export const getLeaderboardTop50 = unstable_cache(
  async () => {
    const { data: leaderboardData } = await supabase
      .from("users")
      .select("*")
      .order("commitment_value", { ascending: false })
      .limit(50)
      .throwOnError();

    return leaderboardData ?? [];
  },
  ["leaderboard_top_50" as CacheKey],
  { revalidate: CACHE_24_HOURS },
);

export const getTableLeaderboardValues = async (): Promise<
  TableLeaderboardValue[]
> => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardTop50();

  if (user && !leaderboard.map((entry) => entry.id).includes(user.id)) {
    leaderboard.push(user);
  }

  return leaderboard.map((entry, index) => ({
    id: entry.id.toString(),
    name: entry.username ?? entry.last_wallet ?? "---",
    highlight: entry.id === user?.id,
    builderScore: entry.passport_builder_score,
    bossScore: entry.commitment_value ?? 0,
    nominationsReceived: entry.nominations_made ?? 0,
    rank: (index + 1).toString() ?? "---",
    farcasterId: entry.farcaster_id ?? null,
    passportId: entry.passport_id ?? null,
    walletAddress: entry.last_wallet ?? null,
    farcasterPowerUser: false,
  }));
};
