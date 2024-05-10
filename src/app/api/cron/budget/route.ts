import { NextRequest } from "next/server";
import { DateTime } from "luxon";
import { JobTypes } from "@/app/_api/helpers/job-types";
import { supabase } from "@/db";
import { recalculateBossBudget } from "@/services/crons";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { data: recalculateBossBudgetUpdate } = await supabase
    .from("scheduled_updates")
    .insert({
      job_type: "boss_budget" as JobTypes,
      started_at: DateTime.utc().toISODate(),
    })
    .select("*")
    .single();

  await recalculateBossBudget();

  if (recalculateBossBudgetUpdate) {
    await supabase
      .from("scheduled_updates")
      .update({
        finished_at: DateTime.utc().toISODate(),
      })
      .eq("id", recalculateBossBudgetUpdate.id);
  }

  return Response.json({}, { status: 200 });
}
