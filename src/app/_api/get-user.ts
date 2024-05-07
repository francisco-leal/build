import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { unstable_cache } from "next/cache";

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

export const getUser = unstable_cache(
  async (wallet: string): Promise<User | null> => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .single();
    if (!data) return null;
    return data;
  },
  ["user"],
  { revalidate: 60 },
);

export const getCurrentUser = async (): Promise<User | null> => {
  const user = await getSession();
  return user ? getUser(user.wallet) : null;
};

export const isUserConnected = async () => {
  return !!(await getCurrentUser());
};
