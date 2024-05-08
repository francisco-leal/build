import { supabase } from "@/db";
import { unstable_cache } from "next/cache";
import { User, getUser } from "./get-user";
import { getSession } from "@/services/authentication/cookie-session";

export type UserNomination = {
  id: number;
  bossPointsEarned: number;
  bossPointsGiven: number;
  destinationWallet: string;
  destinationUsername: string;
  destinationRank: number | null;
  createdAt: string;
};

export const getUserNominations = unstable_cache(
  async (wallet: string): Promise<UserNomination[]> => {
    const { data } = await supabase
      .from("boss_nominations")
      .select(
        `
        id,
        wallet_destination,
        boss_points_earned,
        boss_points_given,
        created_at,
        users:wallet_destination ( 
          username
        )
      `,
      )
      .order("created_at", { ascending: false })
      .limit(50)
      .eq("wallet_origin", wallet);

    return (data ?? []).map((nomination) => ({
      id: nomination.id,
      bossPointsEarned: nomination.boss_points_earned,
      bossPointsGiven: nomination.boss_points_given,
      // FIX ME !!!
      destinationUsername: "", //nomination.boss_leaderboard.username,
      destinationRank: null, // nomination.boss_leaderboard.rank,
      createdAt: nomination.created_at,
    }));
  },
  ["user_nominations"],
  { revalidate: 30 },
);

/** Returns the nomination the user has made today */
export const getUserNomination = async (
  wallet: string,
): Promise<UserNomination | null> => {
  const nominations = await getUserNominations(wallet);
  const lastNomination = nominations[0];
  if (!lastNomination) return null;
  const today = new Date().toISOString().split("T")[0];
  if (lastNomination.createdAt.split("T")[0] === today) return lastNomination;
  return null;
};

export const getCurrentUserNomination =
  async (): Promise<UserNomination | null> => {
    const user = await getSession();
    return user ? getUserNomination(user.wallet) : null;
  };
