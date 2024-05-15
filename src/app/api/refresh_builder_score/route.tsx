import { revalidateTag } from "next/cache";
import { CacheKey } from "@/app/_api/helpers/cache-keys";
import { supabase } from "@/db";
import type { NextRequest } from "next/server";

type PassportResult = {
  score: number;
  passport_id: number;
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
      { status: 400 },
    );
  }

  const passport_id = data.passport_id;
  const builder_score = data.score;

  const { data: user } = await supabase
    .from("users")
    .update({ passport_builder_score: builder_score })
    .eq("passport_id", passport_id)
    .select("id");

  if (user && user.length > 0)
    revalidateTag(`user_${user[0].id}` satisfies CacheKey);

  return Response.json({}, { status: 200 });
}
