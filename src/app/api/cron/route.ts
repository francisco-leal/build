import { NextRequest } from "next/server";
import {
  computeLeaderboard,
  resetMissedStreaks,
  recalculateBossBudget,
} from "@/services";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // TODO: split this into different crons
  await computeLeaderboard();
  await resetMissedStreaks();
  await recalculateBossBudget();

  return Response.json({}, { status: 200 });
}
