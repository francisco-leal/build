import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";

export const revalidate = 0;
export async function GET() {
  const user = await getSession();

  // if user is present, load user first and avoid repeating it

  if (!!user) {
    let { data: app_leaderboard, error } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .neq("user_id", user.userId)
      .order("rank", { ascending: true })
      .limit(10);

    if (error || !app_leaderboard) {
      return Response.json({ error }, { status: 404 });
    }
    const { data: currentUserRank } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .eq("user_id", user.userId)
      .single();

    if (
      !!currentUserRank &&
      !!app_leaderboard &&
      !app_leaderboard.find(
        (leaderboardPosition) => leaderboardPosition.user_id === user.userId
      )
    ) {
      app_leaderboard = [currentUserRank, ...app_leaderboard];
    }

    return Response.json({ leaderboard: app_leaderboard });
  }

  const { data: app_leaderboard, error } = await supabase
    .from("app_leaderboard_current")
    .select("*")
    .order("rank", { ascending: true })
    .limit(10);

  if (error || !app_leaderboard) {
    return Response.json({ error }, { status: 404 });
  }

  return Response.json({ leaderboard: app_leaderboard });
}
