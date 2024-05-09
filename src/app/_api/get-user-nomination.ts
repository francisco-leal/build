import { supabase } from "@/db";
import { unstable_cache } from "next/cache";
import { getSession } from "@/services/authentication/cookie-session";
import { makeMap } from "@/shared/utils/make-map";

export type UserNomination = {
  id: number;
  bossPointsEarned: number;
  bossPointsGiven: number;
  destinationWallet: string;
  destinationUsername: string | null;
  destinationRank: number | null;
  createdAt: string;
};

export const getUserNominations = unstable_cache(
  async (wallet: string): Promise<UserNomination[]> => {
    const { data: nominations } = await supabase
      .from("boss_nominations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)
      .eq("wallet_origin", wallet.toLowerCase());

    if (!nominations) return [];

    const { data: users } = await supabase
      .from("boss_leaderboard")
      .select("*")
      .in(
        "wallet",
        nominations.map((n) => n.wallet_destination),
      );

    const usersMap = makeMap(users ?? [], (u) => u.wallet);

    return nominations.map((nomination) => ({
      id: nomination.id,
      bossPointsEarned: nomination.boss_points_earned,
      bossPointsGiven: nomination.boss_points_given,
      destinationWallet: nomination.wallet_destination,
      destinationUsername: usersMap[nomination.wallet_destination]?.username,
      destinationRank: usersMap[nomination.wallet_destination]?.rank,
      createdAt: nomination.created_at,
    }));
  },
  ["user_nominations"],
  { revalidate: 30 },
);
