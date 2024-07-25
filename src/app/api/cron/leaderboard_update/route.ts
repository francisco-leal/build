import { NextRequest } from "next/server";
import { getLeaderboardTop50 } from "@/app/_api/functions/get-table-leaderboard-values";
import { supabase } from "@/db";

export const maxDuration = 60;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const topUsers = await getLeaderboardTop50();

  const leaderboardUsers = topUsers.map((user) => ({
    ...user,
    user_id: user.id,
  }));

  await supabase.from("leaderboard").delete();
  await supabase.from("leaderboard").insert(leaderboardUsers);

  return Response.json({}, { status: 200 });
}
