"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

export const getWeeklyStatsPaginated = async (
  page: number,
  per_page: number,
): Promise<null> => {
  return unstable_cache(
    async (page: number, per_page: number) => {
      await supabase
        .from("users")
        .select("*, wallets(wallet, boss_nominations(*)")
        .range((page - 1) * per_page, page * per_page)
        .order("created_at", { ascending: false })
        .throwOnError();

      // we want:
      // - earned points
      // - count of nominations received
      // - count of nominations given
      return null;
    },
    [`weekly_stats_${page}_${per_page}`, "leaderboard"] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(page, per_page);
};
