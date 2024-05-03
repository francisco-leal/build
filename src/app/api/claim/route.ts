import { type NextRequest } from "next/server";
import { supabase } from "@/db";
import { validateAndNominate } from "@/app/api/nominate/validate-and-nominate";
import { getSession } from "@/services/authentication/cookie-session";

export async function POST(request: NextRequest) {
  const { referral } = (await request.json()) as { referral: string };
  const user = await getSession();

  if (!user) {
    return Response.json({}, { status: 401 });
  }

  if (!referral) {
    return Response.json({ error: "referral not included" }, { status: 400 });
  }

  let { data: app_user, error: error_find } = await supabase
    .from("app_user")
    .select("id")
    .eq("referral_code", referral)
    .single();

  if (error_find || !app_user) {
    return Response.json({ error: error_find }, { status: 404 });
  }

  const { data: nominated_result, error } = await validateAndNominate(
    { userId: app_user.id },
    user.userWalletAddress,
  );

  if (error || !nominated_result || nominated_result.length === 0) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(nominated_result[0]);
}
