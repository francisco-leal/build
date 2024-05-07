import { type NextRequest } from "next/server";
import { validateAndNominate } from "../validate-and-nominate";
import { supabase } from "@/db";

export async function POST(request: NextRequest) {
  const authKey = request.headers.get("x-api-key");
  if (authKey !== process.env.FRAME_API_SECRET) {
    return Response.json({ error: "Unauthorized!" }, { status: 401 });
  }

  const { nominated_user_address, from_user_address } =
    (await request.json()) as {
      nominated_user_address: string;
      from_user_address: string;
    };

  const { data: user } = await supabase
    .from("users")
    .select("wallet")
    .eq("wallet", from_user_address)
    .single();

  if (!user) {
    return Response.json({}, { status: 401 });
  }

  const { data: nominated_result, error } = await validateAndNominate(
    { wallet: user.wallet },
    nominated_user_address,
  );

  if (error || !nominated_result) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(nominated_result);
}
