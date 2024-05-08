import { restApiHandler } from "@/app/_api/rest-api-handler";
import { searchBuilders } from "@/app/_api/search-builders";
import { type NextRequest } from "next/server";
import { z } from "zod";

const searchParamsSchema = z.object({
  query: z.string().min(3),
});

export const GET = restApiHandler(async (request) => {
  const searchParams = searchParamsSchema.parse({
    query: request.nextUrl.searchParams.get("query"),
  });

  return await searchBuilders(searchParams.query);
});
