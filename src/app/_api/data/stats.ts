"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";
import { User, getUserFromWallet } from "./users";

type UserStats = User & {
  nominations_count: number;
};

export const getUserStats = async (
  wallet: string,
): Promise<UserStats | null> => {
  return unstable_cache(
    async (wallet: string) => {
      const user = await getUserFromWallet(wallet);
      if (!user) return null;

      const { count } = await supabase
        .from("boss_nominations")
        .select("*", { count: "exact", head: true })
        .eq("origin_user_id", user.id)
        .throwOnError();

      return { ...user, nominations_count: count ?? 0 };
    },
    [`stats_${wallet}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(wallet);
};
