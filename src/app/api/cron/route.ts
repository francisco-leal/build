import {
  computeLeaderboard,
  computeUserNominationsAndStats,
  getNominationsFromFarcaster,
} from "@/services";
import { updateBossTokenBalances } from "@/services/boss-tokens";
import { updateMintedManifestoNFTUsers } from "@/services/manifesto-nft";

export async function GET() {
  // cron job endpoint
  await Promise.all([
    updateMintedManifestoNFTUsers(),
    updateBossTokenBalances(),
  ]);
  //
  await getNominationsFromFarcaster();
  await computeUserNominationsAndStats();
  await computeLeaderboard();

  return Response.json({}, { status: 200 });
}

export const dynamic = "force-dynamic";
