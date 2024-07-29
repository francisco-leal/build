import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { DateTime } from "luxon";
import { supabase } from "@/db";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // reset noms weekly
  await supabase.rpc("reset_nominations_weekly");

  // update points for all users
  await supabase.rpc("update_boss_score_for_all", {
    p_end_date: DateTime.local().toISO(),
  });

  revalidateTag("leaderboard_top_50");

  return Response.json({}, { status: 200 });
}
