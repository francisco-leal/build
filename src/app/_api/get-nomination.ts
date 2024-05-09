import { supabase } from "@/db";
import { unstable_cache } from "next/cache";
import { makeMap } from "@/shared/utils/make-map";

export type Nomination = {
  id: number;
  bossPointsEarned: number;
  bossPointsGiven: number;
  originWallet: string;
  destinationWallet: string;
  destinationUsername: string | null;
  destinationRank: number | null;
  createdAt: string;
};

export const getNominationsFromWallet = unstable_cache(
  async (wallet: string): Promise<Nomination[]> => {
    const { data: nominations } = await supabase
      .from("boss_nominations")
      .select("*")
      .order("created_at", { ascending: false })
      // FIXME: This limit will break the app if Builder lasts
      // longer than 50 days
      .limit(50 * 3)
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
      originWallet: nomination.wallet_origin,
      bossPointsEarned: nomination.boss_points_earned,
      bossPointsGiven: nomination.boss_points_given,
      destinationWallet: nomination.wallet_destination,
      destinationUsername: usersMap[nomination.wallet_destination]?.username,
      destinationRank: usersMap[nomination.wallet_destination]?.rank,
      createdAt: nomination.created_at,
    }));
  },
  ["nominations"],
  { revalidate: 60 * 5 },
);

export const getNomination = unstable_cache(
  async (
    originWallet: string,
    destinationWallet: string,
  ): Promise<Nomination | null> => {
    const { data: nomination } = await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", originWallet.toLowerCase())
      .eq("wallet_destination", destinationWallet.toLowerCase())
      .single();

    if (!nomination) return null;

    const { data: user } = await supabase
      .from("boss_leaderboard")
      .select("*")
      .eq("wallet", destinationWallet.toLowerCase())
      .single();

    if (!user) return null;

    return {
      id: nomination.id,
      bossPointsEarned: nomination.boss_points_earned,
      bossPointsGiven: nomination.boss_points_given,
      originWallet: nomination.wallet_origin,
      destinationWallet: nomination.wallet_destination,
      destinationUsername: user?.username ?? null,
      destinationRank: user?.rank ?? null,
      createdAt: nomination.created_at,
    };
  },
  ["nomination"],
  { revalidate: 60 * 5 },
);
