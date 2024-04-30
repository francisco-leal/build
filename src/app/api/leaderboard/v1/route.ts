import { supabase } from "@/db";

export const revalidate = 0;

export async function GET() {
  let { data: app_leaderboard, error } = await supabase
    .from("app_leaderboard_v1")
    .select("*")
    .order("builder_score");

  if (error || !app_leaderboard) {
    return Response.json({ error }, { status: 404 });
  }

  return Response.json(app_leaderboard);
}
