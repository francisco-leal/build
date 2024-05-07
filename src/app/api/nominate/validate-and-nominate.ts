import { supabase } from "@/db";
import { createProfile } from "@/app/api/profile/create";

// TODO: maybe this can be improved somehow
export async function validateAndNominate(
  user_nominator: { wallet: string },
  nominated_user_address: string,
) {
  // find user and limits
  const [{ data: nominated_user, error: error_find }] = await Promise.all([
    supabase.from("users").select("*").eq("wallet", nominated_user_address),
  ]);

  if (error_find) {
    return { error: error_find, data: null };
  }

  // @TODO: Add logic to check if user already nominated more than 3 builders

  if (!nominated_user || nominated_user.length === 0) {
    const { error: error_write } = await createProfile(nominated_user_address);

    if (error_write) {
      return { error: error_write, data: null };
    }
  }

  // validate user nominating user and limits
  const fromDate = new Date();
  fromDate.setHours(0, 0, 0, 0);
  const toDate = new Date();
  toDate.setHours(0, 0, 0, 0);
  toDate.setDate(toDate.getDate() + 1);

  const [{ data: user_nominated_user, error: error_user_nominated_user }] =
    await Promise.all([
      supabase
        .from("boss_nominations")
        .select("*")
        .eq("wallet_origin", user_nominator.wallet)
        .eq("wallet_destination", nominated_user[0].wallet),
    ]);

  if (error_user_nominated_user) {
    return { error: error_user_nominated_user, data: null };
  }

  if (nominated_user[0].wallet === user_nominator.wallet) {
    return { error: "can not nominate yourself", data: null };
  }

  return { error: null, data: nominated_user[0] };
}
