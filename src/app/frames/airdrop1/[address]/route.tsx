import { Button } from "frames.js/next";
import { isAddress } from "viem";
import { getAirdropRankForUser } from "@/app/_api/data/users";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames } from "@/app/frames/frames";
import { getBuildCommitted } from "@/services/boss-tokens";
import Airdrop1Details from "@/shared/components/frames/airdrop1-details";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
import { getTopNominators } from "@/shared/frames/get-top-nominators";
import { imageOptions } from "@/shared/frames/utils";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { BadRequestError } from "@/shared/utils/error";

// used in frames to check USER_ADDRESS airdrop1 stats
const handler = frames(async (ctx) => {
  const userAddress =
    ctx.url.pathname.split("/frames/airdrop1/")[1]?.toLowerCase() ?? "";
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    if (!userAddress || !isAddress(userAddress))
      throw new BadRequestError("Invalid wallet address");

    const [currentUser, currentFarcasterUser] = await Promise.all([
      getConnectedUserProfile(userAddress),
      getFarcasterUser(userAddress),
    ]);
    if (!currentFarcasterUser) throw new BadRequestError("User not found");
    const [topNominators, airdropInfo, buildCommitted] = await Promise.all([
      getTopNominators(currentUser),
      getAirdropRankForUser(currentUser),
      getBuildCommitted(userAddress),
    ]);

    return {
      image: (
        <Airdrop1Details
          currentFarcasterUser={currentFarcasterUser}
          buildCommitted={buildCommitted}
          rank={airdropInfo?.rank || -1}
          topNominators={topNominators.slice(0, 3)}
        />
      ),
      buttons: [
        <Button action="post" key="1" target="/airdrop1">
          Check my stats
        </Button>,
        <Button action="link" key="2" target="https://www.build.top/airdrop1">
          Claim $BUILD
        </Button>,
      ],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "";
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    return {
      image: (
        <NominateBuilderError
          farcasterUsername={farcasterUsername}
          farcasterPfp={farcasterPfp}
          builderImage={undefined}
          builderUsername={abbreviateWalletAddress(userAddress)}
          errorTitle="Builder not found"
          errorMessage=""
        />
      ),
      buttons: [],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  }
});

export const GET = handler;
export const POST = handler;
