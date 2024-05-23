"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { TableLeaderboardValue } from "../../_components/table-leaderboard";
import { getCurrentUser } from "../data/users";
import { CacheKey } from "../helpers/cache-keys";

const getLeaderboardTop50 = unstable_cache(async () => {
  const { data: leaderboardData } = await supabase
    .from("boss_leaderboard")
    .select("*, users(farcaster_id, passport_id, last_wallet)")
    .order("rank", { ascending: true })
    .order("passport_builder_score", { ascending: false })
    .limit(50)
    .throwOnError();

  return leaderboardData ?? [];
}, ["leaderboard_top_50" satisfies CacheKey]);

export const getTableLeaderboardValues = async (): Promise<
  TableLeaderboardValue[]
> => {
  const user = await getCurrentUser();
  const leaderboard = await getLeaderboardTop50();
  const containsUser = leaderboard.some((l) => l.user_id === user?.id);

  if (!containsUser && user?.boss_leaderboard) {
    leaderboard.push({
      ...user.boss_leaderboard,
      users: {
        farcaster_id: null,
        passport_id: null,
        last_wallet: user.wallet,
      },
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
      farcasterId: entry.users?.farcaster_id ?? null,
      passportId: entry.users?.passport_id ?? null,
      walletAddress: entry.users?.last_wallet ?? null,
    }));
};
