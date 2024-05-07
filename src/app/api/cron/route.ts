import { NextRequest } from "next/server";
import { computeLeaderboard } from "@/services";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  await computeLeaderboard();

  return Response.json({}, { status: 200 });
}
