import { supabase } from "@/db";
import { BadRequestError } from "@/shared/utils/error";
import { createNewUser } from "./create-new-user";
import { DateTime } from "luxon";

/** Nominated user may not exist yet on the DB */
export const getNominatedUser = async (wallet: string) => {
  const { data: existing_nominated_user, error: error_find } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", wallet.toLowerCase());

  if (error_find) throw error_find;
  if (!existing_nominated_user || existing_nominated_user.length === 0) {
    return await createNewUser(wallet);
  } else {
    return existing_nominated_user[0];
  }
};

/** Boss Points calculated according to the game rules */
export const getBossNominationBalances = async (wallet: string) => {
  const { data: user, error: error_user } = await supabase
    .from("users")
    .select("boss_budget, boss_score")
    .eq("wallet", wallet.toLowerCase())
    .single();

  if (!user) throw new BadRequestError("Could not find user");

  return {
    dailyBudget: user.boss_budget,
    pointsGiven: user.boss_budget * 0.9,
    pointsEarned: user.boss_budget * 0.1,
    // TODO: Validate if this is correct
    totalPoints: user.boss_score,
  };
};

/** A User cannot nominate themselves */
export const isSelfNomination = (
  nominatorWallet: string,
  nominatedWallet: string,
) => {
  return nominatorWallet.toLowerCase() === nominatedWallet.toLowerCase();
};

/** A User cannot nominate the same builder twice  */
export const isDuplicateNomination = async (
  nominatorWallet: string,
  nominatedWallet: string,
) => {
  const { data: nominations, error: error_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_origin", nominatorWallet.toLowerCase())
    .eq("wallet_destination", nominatedWallet.toLowerCase());
  if (error_nominations) throw error_nominations;
  return nominations.length > 0;
};

/** A User is limited to 3 nomination per day */
export const hasExceededNominationsToday = async (nominatorWallet: string) => {
  const fromDate = DateTime.utc().startOf("day");
  const toDate = fromDate.plus({ hours: 24 });

  const { data: nominations, error: error_nominations } = await supabase
    .from("boss_nominations")
    .select("*")
    .eq("wallet_origin", nominatorWallet.toLowerCase())
    .gte("created_at", fromDate.toISODate())
    .lte("created_at", toDate.toISODate());

  if (error_nominations) throw error_nominations;
  return nominations.length > 3;
};

export async function createNewNomination(
  nominatorWallet: string,
  nominatedWallet: string,
) {
  const nominatorUser = await getNominatedUser(nominatorWallet);
  const nominatedUser = await getNominatedUser(nominatedWallet);

  if (!nominatorUser) {
    throw new BadRequestError("Could not find user");
  }
  if (!nominatedUser) {
    throw new BadRequestError("Could not find nominated user");
  }
  if (isSelfNomination(nominatorWallet, nominatedWallet)) {
    throw new BadRequestError("You cannot nominate yourself!");
  }
  if (await isDuplicateNomination(nominatorWallet, nominatedWallet)) {
    throw new BadRequestError("You already nominated this builder before!");
  }
  if (await hasExceededNominationsToday(nominatorWallet)) {
    throw new BadRequestError("You have already nominated a builder today!");
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

  return nominatedUser;
}
