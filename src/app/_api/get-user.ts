"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { getSession } from "@/services/authentication/cookie-session";
import { CACHE_5_MINUTES, CacheKey } from "./helpers/cache-keys";

export type User = Database["public"]["Tables"]["users"]["Row"];

export const getUserFromId = async (userId: string): Promise<User | null> => {
  return unstable_cache(
    async (id: string) => {
      const userInfo = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .throwOnError()
        .then((res) => res.data?.[0]);
      return userInfo ?? null;
    },
    [`user_${userId}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(userId);
};

export const getUserFromWallet = async (
  wallet: string,
): Promise<User | null> => {
  const walletLc = wallet.toLowerCase();
  const userId = await supabase
    .from("wallets")
    .select("user_id")
    .eq("wallet", walletLc)
    .throwOnError()
    .then((res) => res.data?.[0]?.user_id);
  if (!userId) return null;
  return getUserFromId(userId);
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  if (!user) return null;
  return getUserFromId(user.userId);
};
