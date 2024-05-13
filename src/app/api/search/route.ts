import { z } from "zod";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import { searchBuilders } from "@/app/_api/search-builders";

const searchParamsSchema = z.object({
  query: z.string().min(3),
  domain: z.string(),
});

export const GET = restApiHandler(async (request) => {
  const searchParams = searchParamsSchema.parse({
    query: request.nextUrl.searchParams.get("query"),
    domain: request.nextUrl.searchParams.get("domain"),
  });

  return await searchBuilders(searchParams.query, searchParams.domain);
});
