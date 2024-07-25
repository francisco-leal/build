import { z } from "zod";
import { getUserStats } from "@/app/_api/data/stats";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import { BadRequestError, NotFoundError } from "@/shared/utils/error";

const statsParamsSchema = z.object({
  wallet: z.string(),
});

export const GET = restApiHandler(async (request) => {
  const statsParams = statsParamsSchema.parse({
    wallet: request.nextUrl.searchParams.get("wallet"),
  });

  if (
    !statsParams.wallet ||
    statsParams.wallet.length !== 42 ||
    !statsParams.wallet.startsWith("0x")
  ) {
    throw new BadRequestError("Invalid wallet address");
  }

  const userStats = await getUserStats(statsParams.wallet.toLowerCase());

  if (!userStats) {
    throw new NotFoundError("User not found");
  }

  return {
    id: userStats.id,
    wallet: statsParams.wallet,
    build_score: userStats.boss_score,
    build_budget: userStats.boss_budget,
    rank: userStats.boss_leaderboard?.rank,
    nominations_received: userStats.nominations_received,
    nominations_received_current_week:
      userStats.nominations_received_current_week,
    nominations_given: userStats.nominations_made,
    nominations_given_current_week: userStats.nominations_made_current_week,
    tokens_committed_round_1: userStats.build_commit_amount,
    talent_passport_id: userStats.passport_id,
    talent_builder_score: userStats.passport_builder_score,
  };
});
