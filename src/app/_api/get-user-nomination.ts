import { supabase } from "@/db";
import { unstable_cache } from "next/cache";
import { User, getUser } from "./get-user";
import { getSession } from "@/services/authentication/cookie-session";

/**
 * Returns the nomination the user has made today
 */
export const getUserNomination = unstable_cache(
  async (wallet: string): Promise<User | null> => {
    const { data } = await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", wallet.toLowerCase())
      // TODO: this will for sure cause issues. The idea is to retrive
      // the nomination the user has made today.
      .gte("created_at", new Date().toISOString().split("T")[0]);

    if (data?.length !== 1) return null;
    const nominatedWallet = data[0].wallet_destination;
    return getUser(nominatedWallet);
  },
  ["user_nomination"],
  { revalidate: 30 }
);

export const getCurrentUserNomination = async (): Promise<User | null> => {
  const user = await getSession();
  return user ? getUserNomination(user.wallet) : null;
};
