"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { DateTime, Interval } from "luxon";
import { supabase } from "@/db";
import { BadRequestError } from "@/shared/utils/error";
import { createNewUser } from "./create-new-user";
import { getNomination, getNominationsFromWallet } from "./get-nomination";
import { getCurrentUser, getUser } from "./get-user";
import { CacheKey } from "./helpers/cache-keys";
import { JobTypes } from "./helpers/job-types";

export const getNominatedUser = async (wallet: string) => {
  const existingUser = await getUser(wallet);
  if (existingUser) return existingUser;
  return await createNewUser(wallet);
};

export const getTodaysNominations = async (wallet: string) => {
  const nominations = await getNominationsFromWallet(wallet);
  const fromDate = DateTime.utc().startOf("day");
  const toDate = fromDate.plus({ hours: 24 });
  const interval = Interval.fromDateTimes(fromDate, toDate);
  return nominations.filter((n) =>
    interval.contains(DateTime.fromISO(n.createdAt)),
  );
};

export const getBossNominationBalances = async (wallet: string) => {
  const user = await getUser(wallet);
  if (!user) throw new BadRequestError("Could not find user");

  return {
    dailyBudget: user.boss_budget,
    pointsGiven: user.boss_budget * 0.9,
    pointsEarned: user.boss_budget * 0.1,
    totalPoints: user.boss_score + user.boss_budget * 0.1,
  };
};

export const isSelfNomination = async (
  nominatorWallet: string,
  nominatedWallet: string,
) => {
  return nominatorWallet.toLowerCase() === nominatedWallet.toLowerCase();
};

export const isUpdatingLeaderboard = async () => {
  const { data: updates } = await supabase
    .from("scheduled_updates")
    .select("*")
    .is("finished_at", null)
    .eq("job_type", "leaderboard" satisfies JobTypes);

  if (!updates) return true;
  if (updates.length > 0) return true;
  return false;
};

export const isDuplicateNomination = async (
  nominatorWallet: string,
  nominatedWallet: string,
) => {
  return !!(await getNomination(nominatorWallet, nominatedWallet));
};

export const hasExceededNominationsToday = async (nominatorWallet: string) => {
  const nominations = await getTodaysNominations(nominatorWallet);
  return (nominations?.length || 0) >= 3;
};

export async function createNewNomination(walletToNominate: string) {
  const nominatorUser = await getCurrentUser();
  const nominatedUser = await getNominatedUser(walletToNominate);
  const nominatorWallet = nominatorUser?.wallet?.toLocaleLowerCase();
  const nominatedWallet = nominatedUser?.wallet?.toLocaleLowerCase();

  if (!nominatorUser || !nominatorWallet) {
    throw new BadRequestError("Could not find user");
  }
  if (!nominatedUser) {
    throw new BadRequestError("Could not find nominated user");
  }
  if (await isSelfNomination(nominatorWallet, nominatedWallet)) {
    throw new BadRequestError("You cannot nominate yourself!");
  }
  if (await isDuplicateNomination(nominatorWallet, nominatedWallet)) {
    throw new BadRequestError("You already nominated this builder before!");
  }
  if (await hasExceededNominationsToday(nominatedWallet)) {
    throw new BadRequestError("You have already nominated a builder today!");
  }
  if (await isUpdatingLeaderboard()) {
    throw new BadRequestError(
      "Leaderboard is currently updating, please try again later!",
    );
  }

  const balances = await getBossNominationBalances(nominatorWallet);

  await supabase
    .from("boss_nominations")
    .insert({
      wallet_origin: nominatorUser.wallet.toLowerCase(),
      wallet_destination: nominatedUser.wallet.toLowerCase(),
      boss_points_earned: balances.pointsEarned,
      boss_points_given: balances.pointsGiven,
    })
    .throwOnError();

  if ((await getTodaysNominations(nominatorWallet)).length === 0) {
    await supabase
      .from("users")
      .update({
        boss_nomination_streak: nominatorUser.boss_nomination_streak + 1,
      })
      .eq("wallet", nominatorUser.wallet)
      .throwOnError();
  }

  await supabase.rpc("update_boss_score", {
    wallet_to_update: nominatorUser.wallet,
  });

  await supabase.rpc("update_boss_score", {
    wallet_to_update: nominatedUser.wallet,
  });

  revalidatePath(`/airdrop`);
  revalidatePath(`/airdrop/nominate/${nominatedUser.wallet}`);
  revalidatePath(`/nominate/${nominatedUser.wallet}`);
  revalidateTag(`user_${nominatorUser.wallet}` as CacheKey);
  return nominatedUser;
}
