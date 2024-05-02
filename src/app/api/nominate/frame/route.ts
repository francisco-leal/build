import { type NextRequest } from "next/server";
import { validateAndNominate } from "../validate-and-nominate";
import { supabase } from "@/db";

export async function POST(request: NextRequest) {
  const { nominated_user_address, from_user_address } = await request.json() as {
    nominated_user_address: string;
    from_user_address: string;
  };

  const { data: user } = await supabase
    .from("app_user")
    .select("id")
    .eq("wallet_address", from_user_address)
    .single();

  if (!user) {
    return Response.json({}, { status: 401 });
  }

  const { data: nominated_result, error } = await validateAndNominate(
    { userId: user.id },
    nominated_user_address,
  );

  if (error || !nominated_result || nominated_result.length === 0) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(nominated_result[0]);
}
