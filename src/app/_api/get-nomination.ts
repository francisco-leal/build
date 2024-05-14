"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { makeMap } from "@/shared/utils/make-map";
import {
  CACHE_5_MINUTES,
  CACHE_1_MINUTE,
  CacheKey,
} from "./helpers/cache-keys";
import { User } from "./get-user";

export type Nomination = {
  id: number;
  bossPointsEarned: number;
  bossPointsGiven: number;
  originUserId: string;
  destinationWallet: string;
  destinationUsername: string | null;
  destinationRank: number | null;
  createdAt: string;
};

const SELECT_NOMINATIONS = `
  id,
  user_id,
  boss_points_received,
  boss_points_sent,
  wallet_id,
  created_at,
  wallets (
    wallet,
    users (
      id,
      username,
      boss_leaderboard (
        id,
        rank
      )
    ) 
  )       
` as const;



export const getNominationsFromUser = async (
  user: User,
): Promise<Nomination[]> => {
  return await unstable_cache(
    async () => {
      const { data: nominations } = await supabase
        .from("boss_nominations")
        .select(SELECT_NOMINATIONS)
        .order("created_at", { ascending: false })
        .eq("user_id", user.id)
        .throwOnError();

      return (
        nominations?.map((nomination) => ({
          id: nomination.id,
          originUserId: nomination.user_id,
          bossPointsEarned: nomination.boss_points_received,
          bossPointsGiven: nomination.boss_points_sent,
          destinationWallet: nomination.wallet_id,
          destinationUsername: nomination.wallets?.users?.username ?? null,
          destinationRank:
            nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
          createdAt: nomination.created_at,
        })) ?? []
      );
    },
    ["nominations", "leaderboard", `user_${userId}`] satisfies CacheKey[],
    { revalidate: CACHE_1_MINUTE },
  )();
};

export const getNominationsFromUserToday = async (user: User) => {
  const nominations = await getNominationsFromUserId(user);
  const fromDate = DateTime.utc().startOf("day");
  const toDate = fromDate.plus({ hours: 24 });
  const interval = Interval.fromDateTimes(fromDate, toDate);
  return nominations.filter((n) =>
    interval.contains(DateTime.fromISO(n.createdAt)),
  );
};

export const getNomination = async (
  originUserId: string,
  destinationWalletId: string,
): Promise<Nomination | null> => {
  const destinationLc = destinationWalletId.toLowerCase();
  return await unstable_cache(
    async () => {
      const { data: nomination } = await supabase
        .from("boss_nominations")
        .select(SELECT_NOMINATIONS)
        .eq("user_id", originUserId)
        .eq("wallet_id", destinationLc)
        .single()
        .throwOnError();

      if (!nomination) throw new Error("Nomination not found");

      return {
        id: nomination.id,
        originUserId: nomination.user_id,
        bossPointsEarned: nomination.boss_points_received,
        bossPointsGiven: nomination.boss_points_sent,
        destinationWallet: nomination.wallet_id,
        destinationUsername: nomination.wallets?.users?.username ?? null,
        destinationRank:
          nomination.wallets?.users?.boss_leaderboard?.rank ?? null,
        createdAt: nomination.created_at,
      };
    },
    ["nominations", "leaderboard", `user_${originUserId}`] satisfies CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};
