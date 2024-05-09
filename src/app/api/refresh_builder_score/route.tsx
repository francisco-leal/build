import type { NextRequest } from "next/server";
import { supabase } from "@/db";

type PassportResult = {
  score: number;
  user: {
    profile_picture_url: string;
    username: string;
  } | null;
  passport_profile: {
    image_url: string;
    name: string;
  } | null;
  verified_wallets: Array<string>;
};

type PassportResponse = {
  passport: PassportResult;
  error?: string;
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = (await request.json()) as PassportResponse;

  if (!data.passport) {
    return Response.json(
      { message: "No passport data provided" },
      { status: 400 },
    );
  }

  const wallets = data.passport.verified_wallets;

  if (!wallets || wallets.length === 0) {
    return Response.json({ message: "No verified wallets" }, { status: 200 });
  }

  const builder_score = data.passport.score;

  await supabase
    .from("users")
    .update({ passport_builder_score: builder_score })
    .in("wallet", wallets);

  return Response.json({}, { status: 200 });
}