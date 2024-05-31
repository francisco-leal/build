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
  originWallet: string;
  walletToNominate: string;
};

export const POST = restApiHandler(
  async (request) => {
    const { originWallet, walletToNominate } =
      (await request.json()) as CreateNominationRequest;

    const userNominating = await createNewUserForWallet(originWallet);
    const walletInfo = await getWalletFromExternal(walletToNominate);

    if (!userNominating) throw new BadRequestError("Could not find user");
    if (!walletInfo) throw new BadRequestError("Could not find wallet info");

    return createNewNomination(userNominating, walletInfo, originWallet);
  },
  {
    validateWriteAccess: true,
  },
);
