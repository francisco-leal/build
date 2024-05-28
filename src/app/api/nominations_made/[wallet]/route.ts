import { z } from "zod";
import { getApiKey } from "@/app/_api/data/api_keys";
import { getNominationsUserSent } from "@/app/_api/data/nominations";
import { getUserFromWallet } from "@/app/_api/data/users";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/utils/error";

const statsParamsSchema = z.object({
  api_key: z.string(),
  wallet: z.string().optional(),
});

export const GET = restApiHandler(async (request, params) => {
  const nominationsMadeParams = statsParamsSchema.parse({
    api_key: request.headers.get("x-api-key"),
    wallet: params?.wallet,
  });

  const apiKey = await getApiKey(nominationsMadeParams.api_key);

  if (!apiKey || !apiKey.active) {
    throw new UnauthorizedError("Invalid API key");
  }

  if (
    !nominationsMadeParams.wallet ||
    nominationsMadeParams.wallet.length !== 42 ||
    !nominationsMadeParams.wallet.startsWith("0x")
  ) {
    throw new BadRequestError("Invalid wallet address");
  }

  const user = await getUserFromWallet(
    nominationsMadeParams.wallet.toLowerCase(),
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const nominationsMade = await getNominationsUserSent(user);

  return nominationsMade;
});
