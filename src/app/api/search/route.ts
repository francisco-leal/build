import { z } from "zod";
import { searchBuilders } from "@/app/_api/functions/search-builders";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

const searchParamsSchema = z.object({
  query: z.string().min(1),
  domain: z.string(),
});

export const GET = restApiHandler(
  async (request) => {
    const searchParams = searchParamsSchema.parse({
      query: request.nextUrl.searchParams.get("query"),
      domain: request.nextUrl.searchParams.get("domain"),
    });

    const result = await searchBuilders(
      searchParams.query,
      searchParams.domain,
    );
    return result;
  },
  { skipAuth: true },
);

export const maxDuration = 60;
export const dynamic = "force-dynamic";
