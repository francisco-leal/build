import { NextRequest } from "next/server";
import {
  computeLeaderboard,
  computeUserNominationsAndStats,
  getNominationsFromFarcaster,
} from "@/services";
import { updateMintedManifestoNFTUsers } from "@/services/manifesto-nft";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // cron job endpoint
  await updateMintedManifestoNFTUsers();
  // TODO: update boss token balance
  //
  await getNominationsFromFarcaster();
  await computeUserNominationsAndStats();
  await computeLeaderboard();

  return Response.json({}, { status: 200 });
}
