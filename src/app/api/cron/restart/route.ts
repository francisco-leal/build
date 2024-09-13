import { NextRequest } from "next/server";
import { supabase } from "@/db";

export const maxDuration = 300;
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  await fetch("https://api.heroku.com/apps/build-top/dynos", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.HEROKU_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.heroku+json; version=3",
    },
  });

  return Response.json({}, { status: 200 });
}
