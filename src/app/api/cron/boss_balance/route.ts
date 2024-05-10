import { NextRequest } from "next/server";
import { DateTime } from "luxon";
import { JobTypes } from "@/app/_api/helpers/job-types";
import { supabase } from "@/db";
import { recalculateBossBalance } from "@/services/boss_balance";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { data } = await supabase
    .from("scheduled_updates")
    .select("previous_block_number: job_data->>last_block_number")
    .eq("job_type", "boss_balance" as JobTypes)
    .order("finished_at", { ascending: false })
    .single();

  const { data: recalculateBossBalanceUpdate } = await supabase
    .from("scheduled_updates")
    .insert({
      job_type: "boss_balance" as JobTypes,
      started_at: DateTime.utc().toISODate(),
    })
    .select("*")
    .single();

  const lastBlockNumber = await recalculateBossBalance(
    data?.previous_block_number,
  );

  if (recalculateBossBalanceUpdate) {
    await supabase
      .from("scheduled_updates")
      .update({
        finished_at: DateTime.utc().toISODate(),
        job_data: {
          last_block_number: lastBlockNumber,
        },
      })
      .eq("id", recalculateBossBalanceUpdate.id);
  }

  return Response.json({}, { status: 200 });
}
