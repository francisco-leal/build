import { DateTime } from "luxon";
import { getNominationsForApi } from "@/app/_api/data/api_nominations";
import { createNewNomination } from "@/app/_api/data/nominations";
import { createNewUserForWallet } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import { BadRequestError } from "@/shared/utils/error";

export const GET = restApiHandler(async (request) => {
  const from = request.nextUrl.searchParams.get("from") ?? undefined;
  const to = request.nextUrl.searchParams.get("to") ?? undefined;
  const cursor = request.nextUrl.searchParams.get("cursor");

  const nominations = await getNominationsForApi({
    cursor: cursor ? parseInt(cursor) : undefined,
    from,
    to,
  });

  return {
    nominations,
    cursor:
      nominations.length == 10
        ? DateTime.fromISO(
            nominations[nominations.length - 1].nominated_at,
          ).toMillis()
        : null,
  };
});

type CreateNominationRequest = {
  origin_wallet: string;
  destination_wallet: string;
  cast_id?: number;
};

export const POST = restApiHandler(
  async (request) => {
    const { origin_wallet, destination_wallet, cast_id } =
      (await request.json()) as CreateNominationRequest;

    const userNominating = await createNewUserForWallet(
      origin_wallet.toLowerCase(),
    );
    if (!userNominating) throw new BadRequestError("Could not find user");

    const walletInfo = await getWalletFromExternal(
      destination_wallet.toLowerCase(),
    );
    if (!walletInfo) throw new BadRequestError("Could not find wallet info");

    return createNewNomination(
      userNominating,
      walletInfo,
      destination_wallet.toLowerCase(),
      cast_id,
    );
  },
  {
    validateWriteAccess: true,
  },
);
