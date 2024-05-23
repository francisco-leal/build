import { NextRequest } from "next/server";
import { DateTime } from "luxon";
import { JobTypes } from "@/app/_api/helpers/job-types";
import { supabase } from "@/db";
import { recalculateBossBalance } from "@/services/boss_balance";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: recalculateBossBalanceUpdate } = await supabase
    .from("scheduled_updates")
    .insert({
      job_type: "boss_balance" as JobTypes,
      started_at: DateTime.utc().toISO(),
    })
    .select("*")
    .single();

  await recalculateBossBalance();

  if (recalculateBossBalanceUpdate) {
    await supabase
      .from("scheduled_updates")
      .update({
        finished_at: DateTime.utc().toISO(),
      })
      .eq("id", recalculateBossBalanceUpdate.id);
  }

  return Response.json({}, { status: 200 });
}
