import { z } from "zod";
import { getNominationsForApi } from "@/app/_api/data/api_nominations";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

const statsParamsSchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  cursor: z.string().optional(),
});

export const GET = restApiHandler(async (request) => {
  const nominationsParams = statsParamsSchema.parse({
    from: request.nextUrl.searchParams.get("from"),
    to: request.nextUrl.searchParams.get("to"),
    cursor: request.nextUrl.searchParams.get("cursor") ?? 1,
  });

  const nominations = await getNominationsForApi(nominationsParams);

  return nominations;
});
