import { supabase } from "@/db";
import type { NextRequest } from "next/server";

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
  data: PassportResult;
};

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.API_SECRET}`) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data } = (await request.json()) as PassportResponse;

  if (!data) {
    return Response.json(
      { message: "No passport data provided" },
      { status: 400 }
    );
  }

  const wallets = data.verified_wallets;

  if (!wallets || wallets.length === 0) {
    return Response.json({ message: "No verified wallets" }, { status: 200 });
  }

  const builder_score = data.score;

  await supabase
    .from("users")
    .update({ passport_builder_score: builder_score })
    .in("wallet", wallets);

  return Response.json({}, { status: 200 });
}
