"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "@/db";
import { BadRequestError } from "@/shared/utils/error";
import { getNomination, getNominationsFromUserToday } from "./get-nomination";
import { getCurrentUser } from "./get-user";
import { User } from "./get-user";
import { WalletInfo, getWalletInfo } from "./get-wallet-info";
import { CacheKey } from "./helpers/cache-keys";
import { JobTypes } from "./helpers/job-types";


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
  user: User,
  wallet: WalletInfo,
): Promise<boolean> => {
  return (
    user.wallets.some((w) => w.wallet === wallet.wallet) ||
    user.farcaster_id === (wallet.farcaster_id ?? false) ||
    user.passport_id === (wallet.passport_id ?? false)
  );
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
  user: User,
  wallet: WalletInfo,
) => {
  return !!(await getNomination(user.id, wallet.wallet));
};

export const hasExceededNominationsToday = async (nominatorUser: User) => {
  const nominations = await getNominationsFromUserToday(nominatorUser);
  return (nominations?.length || 0) >= 3;
};

export async function createNewNomination(
  nominatorUser: User,
  nominatedWallet: string,
) {
  const nominatedInfo = await getWalletInfo(nominatedWallet);

  if (!nominatedInfo) {
    throw new BadRequestError("Could not find user");
  }
  if (await isSelfNomination(nominatorUser, nominatedInfo)) {
    throw new BadRequestError("You cannot nominate yourself!");
  }
  if (await isDuplicateNomination(nominatorUser, nominatedInfo)) {
    throw new BadRequestError("You already nominated this builder before!");
  }
  if (await hasExceededNominationsToday(nominatorUser)) {
    throw new BadRequestError("You have already nominated 3 builders today!");
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
      wallet_origin: nominatorWallet,
      wallet_destination: nominatedWallet,
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
  revalidateTag(`nominations` as CacheKey);
  return nominatedUser;
}

export async function createNewNominationForCurrentUser(
  walletToNominate: string,
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new BadRequestError("Could not find user");
  return createNewNomination(walletToNominate, currentUser.wallet);
}
