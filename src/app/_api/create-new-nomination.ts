import { supabase } from "@/db";
import { BadRequestError } from "@/shared/utils/error";
import { createNewUser } from "./create-new-user";

const getBossBudget = async (wallet: string) => {
  const { data: user, error: error_user } = await supabase
    .from("users")
    .select("boss_budget")
    .eq("wallet", wallet.toLowerCase())
    .single();

  if (user) {
    return user.boss_budget;
  } else {
    return 0;
  }
};

export async function createNewNomination(
  user_nominator: { wallet: string },
  nominated_user_address: string,
) {
  if (nominated_user_address === user_nominator.wallet) {
    throw new BadRequestError("can not nominate yourself");
  }

  let nominated_user = null;

  const { data: existing_nominated_user, error: error_find } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", nominated_user_address.toLowerCase())
    .throwOnError();

  if (error_find) throw error_find;

  if (!existing_nominated_user || existing_nominated_user.length === 0) {
    nominated_user = await createNewUser(nominated_user_address);
  } else {
    nominated_user = existing_nominated_user[0];
  }

  if (!nominated_user) {
    throw new BadRequestError("Could not find nominated user");
  }

  // validate user nominating user and limits
  const fromDate = new Date();
  let toDate = new Date();

  if (process.env.ALLOW_RECURRING_NOMINATIONS === "true") {
    toDate = new Date(toDate.getTime() + 15 * 60000); // 15 minutes in milliseconds
  } else {
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);
    toDate.setDate(toDate.getDate() + 1);
  }

  const { data: user_nominated_user, error: error_user_nominated_user } =
    await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", user_nominator.wallet.toLowerCase())
      .eq("wallet_destination", nominated_user.wallet.toLowerCase());

  if (error_user_nominated_user) {
    throw error_user_nominated_user;
  }

  if (user_nominated_user.length > 0) {
    throw new BadRequestError("user already nominated this builder");
  }

  const { data: user_nominations, error: error_user_nominations } =
    await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", user_nominator.wallet.toLowerCase())
      .gte("created_at", fromDate.toISOString())
      .lte("created_at", toDate.toISOString());

  if (error_user_nominations) {
    throw error_user_nominations;
  }

  if (user_nominations.length >= 3) {
    throw new BadRequestError("user can only nominate 3 builders per day");
  }

  const boss_budget = await getBossBudget(user_nominator.wallet);

  await supabase
    .from("boss_nominations")
    .insert({
      wallet_origin: user_nominator.wallet.toLowerCase(),
      wallet_destination: nominated_user.wallet.toLowerCase(),
      boss_points_earned: boss_budget * 0.1,
      boss_points_given: boss_budget * 0.9,
    })
    .throwOnError();

  return nominated_user;
}
