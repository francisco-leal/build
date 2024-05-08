import { type NextRequest } from "next/server";
import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { createNewNomination } from "@/app/_api/create-new-nomination";

// TODO use restApiHandler!
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
    .from("users")
    .select("wallet, boss_budget")
    .eq("referral_code", referral)
    .single();

  if (error_find || !app_user) {
    return Response.json({ error: error_find }, { status: 404 });
  }

  // TODO this is probably broken, because the implementation
  // of createNewNomination was changed and not tested on frame!
  const data = await createNewNomination(
    { wallet: app_user.wallet },
    user.wallet,
  );

  return Response.json(data);
}
