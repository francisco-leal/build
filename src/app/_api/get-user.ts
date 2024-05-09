"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { CACHE_5_MINUTES, CacheKey } from "./helpers/cache-keys";

export type User = {
  boss_budget: number;
  boss_nomination_streak: number;
  boss_score: number;
  boss_token_balance: number;
  created_at: string;
  manifesto_nft: boolean;
  passport_builder_score: number;
  referral_code: string;
  username: string | null;
  wallet: string;
};

export const getUser = async (wallet: string): Promise<User | null> => {
  const walletKey = wallet.toLowerCase();
  const cacheKey: CacheKey = `user_${walletKey}`;
  return (
    await unstable_cache(
      async () => {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("wallet", wallet.toLowerCase())
          .single();
        if (!data) return null;
        return data;
      },
      [cacheKey],
      { revalidate: CACHE_5_MINUTES },
    )
  )();
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  return user ? getUser(user.wallet) : null;
};

export const isUserConnected = async () => {
  return !!(await getCurrentUser());
};
