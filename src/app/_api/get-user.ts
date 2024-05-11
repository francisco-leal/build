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
  farcaster_id: number | null;
  passport_id: number | null;
};

export const getUserSkipCache = async (
  wallet: string,
): Promise<User | null> => {
  if (!wallet) return null;

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", wallet.toLowerCase())
    .single();
  if (!data) return null;
  return data;
};

export const getUser = async (wallet: string): Promise<User | null> => {
  if (!wallet) return null;
  const walletKey = wallet.toLowerCase();
  const value = await (
    await unstable_cache(
      () => getUserSkipCache(walletKey),
      [`user_${walletKey}`] satisfies CacheKey[],
      { revalidate: CACHE_5_MINUTES },
    )
  )();
  return value;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  return user ? getUser(user.wallet) : null;
};

export const isUserConnected = async () => {
  return !!(await getCurrentUser());
};
