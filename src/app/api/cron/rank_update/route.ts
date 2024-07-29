import { NextRequest } from "next/server";
import { supabase } from "@/db";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Update user ranks
  await supabase.rpc("update_user_ranks");

  return Response.json({}, { status: 200 });
}
