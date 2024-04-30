import { supabase } from "@/db";
import { createProfile } from "@/app/api/profile/create";

// TODO: maybe this can be improved somehow
export async function validateAndNominate(
  user_nominator: { userId: number },
  nominated_user_address: string,
) {
  // find user and limits
  const [
    { data: nominated_user, error: error_find },
    { data: user_max_nominations, error: error_user_max_nominations },
  ] = await Promise.all([
    supabase
      .from("app_user")
      .select("*")
      .eq("wallet_address", nominated_user_address),
    supabase
      .from("app_user")
      .select("max_nominations")
      .eq("id", user_nominator.userId)
      .single(),
  ]);

  if (error_find) {
    return { error: error_find, data: null };
  }

  if (error_user_max_nominations) {
    return { error: error_user_max_nominations, data: null };
  }

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

  const [
    { data: user_nominated_user, error: error_user_nominated_user },
    {
      data: user_daily_nominated_users,
      error: error_user_daily_nominated_users,
    },
  ] = await Promise.all([
    supabase
      .from("app_nominations")
      .select("id")
      .eq("user_id_from", user_nominator.userId)
      .eq("user_id_nominated", nominated_user[0].id),
    supabase
      .from("app_daily_nominations")
      .select("user_id_nominated")
      .eq("user_id_from", user_nominator.userId)
      .gte("created_at", fromDate.toISOString())
      .lte("created_at", toDate.toISOString()),
  ]);

  if (error_user_nominated_user) {
    return { error: error_user_nominated_user, data: null };
  }

  if (error_user_daily_nominated_users) {
    return { error: error_user_daily_nominated_users, data: null };
  }

  if (
    user_daily_nominated_users &&
    user_max_nominations &&
    user_daily_nominated_users.length >= user_max_nominations.max_nominations
  ) {
    return { error: "user has reached the daily nomination limit", data: null };
  }

  if (user_nominated_user && user_nominated_user.length > 0) {
    return { error: "can not nominate same user twice", data: null };
  }

  if (nominated_user[0].id === user_nominator.userId) {
    return { error: "can not nominate yourself", data: null };
  }

    // insert nomination
    return await supabase
        .from('app_daily_nominations')
        .insert({
            user_id_from: user_nominator.userId,
            user_id_nominated: nominated_user[0].id
        })
        .select();
}
