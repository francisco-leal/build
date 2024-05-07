import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { getBuilderScore } from "@/services/talent-protocol";

export async function PATCH() {
  const user = await getSession();

  if (!user) {
    return Response.json({ error: "user not connected!" }, { status: 401 });
  }
  const builderScore = await getBuilderScore(user.wallet);
  const { data: user_personal_stats, error } = await supabase
    .from("users")
    .update({ passport_builder_score: builderScore })
    .eq("wallet", user.wallet)
    .select()
    .single();

  if (error || !user_personal_stats) {
    return Response.json({ error }, { status: 404 });
  }

  return Response.json(user_personal_stats);
}
