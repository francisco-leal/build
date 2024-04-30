import {
  computeLeaderboard,
  computeUserNominationsAndStats,
  getNominationsFromFarcaster,
} from "@/services";

export async function GET() {
  // cron job endpoint
  await getNominationsFromFarcaster();
  await computeUserNominationsAndStats();
  await computeLeaderboard();

  return Response.json({}, { status: 200 });
}
