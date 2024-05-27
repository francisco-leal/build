import { z } from "zod";
import { getApiKey } from "@/app/_api/data/api_keys";
import { getUserStats } from "@/app/_api/data/stats";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "@/shared/utils/error";

const statsParamsSchema = z.object({
  wallet: z.string(),
  api_key: z.string(),
});

export const GET = restApiHandler(async (request) => {
  const statsParams = statsParamsSchema.parse({
    wallet: request.nextUrl.searchParams.get("wallet"),
    api_key: request.headers.get("x-api-key"),
  });

  const apiKey = await getApiKey(statsParams.api_key);

  if (!apiKey || !apiKey.active) {
    throw new UnauthorizedError("Invalid API key");
  }

  if (
    !statsParams.wallet ||
    statsParams.wallet.length !== 42 ||
    !statsParams.wallet.startsWith("0x")
  ) {
    throw new BadRequestError("Invalid wallet address");
  }

  const userStats = await getUserStats(statsParams.wallet);

  if (!userStats) {
    throw new NotFoundError("User not found");
  }

  return {
    id: userStats.id,
    wallet: statsParams.wallet,
    boss_score: userStats.boss_score,
    boss_budget: userStats.boss_budget,
    rank: userStats.boss_leaderboard?.rank,
    nominations_received: userStats.boss_leaderboard?.nominations_received ?? 0,
    nominations_given: userStats.nominations_count,
  };
});
