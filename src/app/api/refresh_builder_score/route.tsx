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

  const passportId = data.passport_id;
  const builderScore = data.score;

  const userId = await supabase
    .from("wallets")
    .update({ passport_id: passportId })
    .in("wallet", data.verified_wallets)
    .select("user_id")
    .throwOnError()
    .then((res) => res.data?.[0]?.user_id);

  let userData;
  if (userId) {
    userData = await supabase
      .from("users")
      .update({ passport_builder_score: builderScore, passport_id: passportId })
      .eq("id", userId)
      .select("id");
  } else {
    userData = await supabase
      .from("users")
      .update({ passport_builder_score: builderScore })
      .eq("passport_id", passportId)
      .select("id");
  }

  if (userData?.data && userData?.data?.length > 0) {
    revalidateTag(`user_${userData.data[0].id}` satisfies CacheKey);
  }

  return Response.json({}, { status: 200 });
}
