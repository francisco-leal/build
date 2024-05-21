import { z } from "zod";
import { getWeeklyStatsPaginated } from "@/app/_api/data/weekly_stats";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

const weeklyStatsParamsSchema = z.object({
  page: z.number().int().positive(),
  per_page: z.number().int().positive(),
});

export const GET = restApiHandler(async (request) => {
  const weeklyParams = weeklyStatsParamsSchema.parse({
    page: request.nextUrl.searchParams.get("query") || 1,
    per_page: request.nextUrl.searchParams.get("domain") || 10,
  });

  return getWeeklyStatsPaginated(weeklyParams.page, weeklyParams.per_page);
});
