import { getSession } from "@/services/authentication/cookie-session";
import { type NextRequest } from "next/server";
import { validateAndNominate } from "./validate-and-nominate";

export async function POST(request: NextRequest) {
  const { nominated_user_address } = (await request.json()) as {
    nominated_user_address: string;
  };
  const user = await getSession();

  if (!user) {
    return Response.json(
      { message: "User needs to be authenticated to vote" },
      { status: 401 },
    );
  }

  const { data: nominated_result, error } = await validateAndNominate(
    user,
    nominated_user_address,
  );

  if (error || !nominated_result || nominated_result.length === 0) {
    return Response.json({ error }, { status: 400 });
  }

  return Response.json(nominated_result[0]);
}
