import { getSession } from "@/services/authentication/cookie-session";
import { z } from "zod";
import { UnauthorizedError } from "@/shared/utils/error";
import { restApiHandler } from "@/app/_api/rest-api-handler";
import { createNewNomination } from "@/app/_api/create-new-nomination";

const dataSchema = z.object({
  nominatedUserAddress: z.string(),
});

export const POST = restApiHandler(async (request) => {
  const json = await request.json();
  const user = await getSession();
  const { nominatedUserAddress } = dataSchema.parse(json);

  if (!user) {
    throw new UnauthorizedError("You need to be connect your wallet to nominate a boss!");
  }

  return createNewNomination(user, nominatedUserAddress);
});
