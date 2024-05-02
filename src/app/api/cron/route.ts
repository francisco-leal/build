import {
  computeLeaderboard,
  computeUserNominationsAndStats,
  getNominationsFromFarcaster,
} from "@/services";
import { updateMintedManifestoNFTUsers } from "@/services/manifesto-nft";

export async function GET() {
  // cron job endpoint
  await updateMintedManifestoNFTUsers();
  // TODO: update boss token balance
  //
  await getNominationsFromFarcaster();
  await computeUserNominationsAndStats();
  await computeLeaderboard();

  return Response.json({}, { status: 200 });
}
