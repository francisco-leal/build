import { Nomination } from "@/app/_api/data/nominations";
import { formatLargeNumber } from "./format-number";

export function getWarpcastSharableLink(
  todayNominations: Nomination[],
  userWallet: string,
): string {
  let sharableText = "My daily nominations for /build:\n\n";
  if (todayNominations.length === 0) {
    sharableText += "No nominations yet.";
  } else {
    todayNominations.forEach((nomination) => {
      sharableText += `@${nomination.destinationUsername} \n`;
    });
  }
  let sharableTextUriEncoded = "";
  try {
    sharableTextUriEncoded = encodeURI(sharableText);
  } catch (e) {
    sharableTextUriEncoded = encodeURI("My daily nominations for /build:\n\n");
  }
  return `https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&embeds%5B%5D=https://www.build.top/nominations/${userWallet}?t=${Date.now()}`;
}

export function getWarpcastSharableLinkSingleBuilder(
  builderUsername: string,
): string {
  let sharableText = `I just nominated @${builderUsername} for /build because...`;
  let sharableTextUriEncoded = "";
  try {
    sharableTextUriEncoded = encodeURI(sharableText);
  } catch (e) {
    sharableTextUriEncoded = encodeURI("My daily nominations for /build:\n\n");
  }
  return `https://warpcast.com/~/compose?text=${sharableTextUriEncoded}`;
}

export function getWarpcastSharableLinkAirdrop1(
  buildCommitted: number,
  builderWallet: string,
): string {
  let sharableText = `Real builders commit, and I just committed ${formatLargeNumber(buildCommitted)} $BUILD tokens to the BUILD Summer Fund. 🫡`;
  let sharableTextUriEncoded = "";
  try {
    sharableTextUriEncoded = encodeURI(sharableText);
  } catch (e) {
    sharableTextUriEncoded = encodeURI(
      "Real builders commit, and I just committed $BUILD tokens to the BUILD Summer Fund",
    );
  }
  return `https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&embeds%5B%5D=https://www.build.top/airdrop1/${builderWallet}?t=${Date.now()}`;
}
