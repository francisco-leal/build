"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { createNewUser } from "./create-new-user";
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

export const getUser = async (wallet: string): Promise<User | null> => {
  const walletKey = wallet.toLowerCase();
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
      [`user_${walletKey}`] satisfies CacheKey[],
      { revalidate: CACHE_5_MINUTES },
    )
  )();
};

export const getOrCreateUser = async (wallet: string): Promise<User> => {
  return (await getUser(wallet)) ?? (await createNewUser(wallet));
};

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  return user ? getUser(user.wallet) : null;
};

export const isUserConnected = async () => {
  return !!(await getCurrentUser());
};
