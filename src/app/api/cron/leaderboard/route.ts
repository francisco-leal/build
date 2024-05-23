import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { DateTime } from "luxon";
import { CacheKey } from "@/app/_api/helpers/cache-keys";
import { JobTypes } from "@/app/_api/helpers/job-types";
import { supabase } from "@/db";
import { computeLeaderboard } from "@/services/crons";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: leaderboardUpdate } = await supabase
    .from("scheduled_updates")
    .insert({
      job_type: "leaderboard" as JobTypes,
      started_at: DateTime.utc().toISO(),
    })
    .select("*")
    .single();

  await computeLeaderboard();

  if (leaderboardUpdate) {
    await supabase
      .from("scheduled_updates")
      .update({
        finished_at: DateTime.utc().toISO(),
      })
      .eq("id", leaderboardUpdate.id);
  }

  revalidateTag("leaderboard_top_50" satisfies CacheKey);
  revalidateTag("leaderboard_undiscovered" satisfies CacheKey);
  return Response.json({}, { status: 200 });
}
