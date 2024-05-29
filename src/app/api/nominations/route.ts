import { DateTime } from "luxon";
import { getNominationsForApi } from "@/app/_api/data/api_nominations";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

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
