import { supabase } from "@/db";
import { createProfile } from "@/app/api/profile/create";

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

export async function validateAndNominate(
  user_nominator: { wallet: string },
  nominated_user_address: string
) {
  if (nominated_user_address === user_nominator.wallet) {
    return { error: "can not nominate yourself", data: null };
  }

  let nominated_user = null;

  const { data: existing_nominated_user, error: error_find } = await supabase
    .from("users")
    .select("*")
    .eq("wallet", nominated_user_address.toLowerCase());

  if (error_find) {
    return { error: error_find, data: null };
  }

  if (!existing_nominated_user || existing_nominated_user.length === 0) {
    const { data: new_nominated_user, error: error_write } =
      await createProfile(nominated_user_address);

    if (error_write) {
      return { error: error_write, data: null };
    }

    nominated_user = new_nominated_user;
  } else {
    nominated_user = existing_nominated_user[0];
  }

  if (!nominated_user) {
    return { error: "could not find or create nominated user", data: null };
  }

  // validate user nominating user and limits
  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date();
  toDate.setHours(0, 0, 0, 0);
  toDate.setDate(toDate.getDate() + 1);

  const { data: user_nominated_user, error: error_user_nominated_user } =
    await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", user_nominator.wallet.toLowerCase())
      .eq("wallet_destination", nominated_user.wallet.toLowerCase());

  if (error_user_nominated_user) {
    return { error: error_user_nominated_user, data: null };
  }

  if (user_nominated_user.length > 0) {
    return { error: "user already nominated this builder", data: null };
  }

  const { data: user_nominations, error: error_user_nominations } =
    await supabase
      .from("boss_nominations")
      .select("*")
      .eq("wallet_origin", user_nominator.wallet.toLowerCase())
      .gte("created_at", fromDate.toISOString())
      .lte("created_at", toDate.toISOString());

  if (error_user_nominations) {
    return { error: error_user_nominations, data: null };
  }

  if (user_nominations.length >= 3) {
    return { error: "user can only nominate 3 builders per day", data: null };
  }

  const boss_budget = await getBossBudget(user_nominator.wallet);

  await supabase.from("boss_nominations").insert({
    wallet_origin: user_nominator.wallet.toLowerCase(),
    wallet_destination: nominated_user.wallet.toLowerCase(),
    boss_points_earned: boss_budget * 0.1,
    boss_points_given: boss_budget * 0.9,
  });

  return { error: null, data: nominated_user };
}
