import { z } from "zod";
import { getTopNominationsForUser } from "@/app/_api/data/nominations";
import { getUserFromWallet } from "@/app/_api/data/users";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import { BadRequestError, NotFoundError } from "@/shared/utils/error";

const statsParamsSchema = z.object({
  wallet: z.string().optional(),
});

export const GET = restApiHandler(async (request) => {
  const nominationsReceivedParams = statsParamsSchema.parse({
    wallet: request.nextUrl.searchParams.get("wallet"),
  });

  if (
    !nominationsReceivedParams.wallet ||
    nominationsReceivedParams.wallet.length !== 42 ||
    !nominationsReceivedParams.wallet.startsWith("0x")
  ) {
    throw new BadRequestError("Invalid wallet address");
  }

  const user = await getUserFromWallet(
    nominationsReceivedParams.wallet.toLowerCase(),
  );
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const nominationsReceived = await getTopNominationsForUser(user);

  return nominationsReceived;
});
