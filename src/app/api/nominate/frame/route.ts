import { type NextRequest } from "next/server";;
import { supabase } from "@/db";
import { createNewNomination } from "@/app/_api/create-new-nomination";

// TODO use restApiHandler!
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
    .eq("wallet", from_user_address.toLowerCase())
    .single();

  if (!user) {
    return Response.json({}, { status: 401 });
  }

  // TODO this is probably broken, because the implementation
  // of createNewNomination was changed and not tested on frame!
  const data = await createNewNomination(
    { wallet: user.wallet },
    nominated_user_address,
  );

  return Response.json(data);
}
