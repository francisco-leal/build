import { NextRequest } from "next/server";
import { computeLeaderboard } from "@/services";
import { supabase } from "@/db";
import { DateTime } from "luxon";
import { JobTypes } from "@/app/_api/helpers/job-types";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: leaderboardUpdate } = await supabase
    .from("scheduled_updates")
    .insert({
      job_type: "leaderboard" as JobTypes,
      started_at: DateTime.utc().toISODate(),
    })
    .select("*")
    .single();

  await computeLeaderboard();

  if (leaderboardUpdate) {
    await supabase
      .from("scheduled_updates")
      .update({
        finished_at: DateTime.utc().toISODate(),
      })
      .eq("id", leaderboardUpdate.id);
  }

  return Response.json({}, { status: 200 });
}
