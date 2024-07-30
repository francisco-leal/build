import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { supabase } from "@/db";

export const maxDuration = 60;
export async function GET(request: NextRequest) {
  revalidateTag("leaderboard_top_50");
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: leaderboardData } = await supabase
    .from("users")
    .select("*")
    .order("boss_score", { ascending: false })
    .order("passport_builder_score", { ascending: false })
    .gt("nominations_received", 0)
    .or("humanity_checkmark.eq.true,farcaster_power_user.eq.true")
    .limit(50)
    .throwOnError();

  const topUsers = leaderboardData ?? [];

  const leaderboardUsers = topUsers.map((user) => ({
    ...user,
    user_id: user.id,
  }));

  await supabase.from("leaderboard").delete().gt("nominations_received", 0);

  await supabase.from("leaderboard").insert(leaderboardUsers);

  revalidateTag("leaderboard_top_50");

  return Response.json({}, { status: 200 });
}
