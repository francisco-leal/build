import { Button } from "frames.js/next";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { frames, getFramesUser } from "@/app/frames/frames";
import { getBuildCommitted } from "@/services/boss-tokens";
import Airdrop1Details from "@/shared/components/frames/airdrop1-details";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
import { getTopNominators } from "@/shared/frames/get-top-nominators";
import { imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";
import { getWarpcastSharableLinkAirdrop1 } from "@/shared/utils/sharable-warpcast-link";

// used in frames to check MY airdrop1 stats
const handler = frames(async (ctx) => {
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    const currentUser = await getFramesUser(ctx);
    const currentUserAddress = currentUser.wallets[0].wallet || "";

    const currentFarcasterUser = await getFarcasterUser(currentUserAddress);
    if (!currentFarcasterUser) throw new BadRequestError("User not found");
    const [topNominators, builderWallet, buildCommitted] = await Promise.all([
      getTopNominators(currentUser),
      getWalletFromExternal(currentUserAddress),
      getBuildCommitted(currentUserAddress),
    ]);

    return {
      image: (
        <Airdrop1Details
          currentFarcasterUser={currentFarcasterUser}
          buildCommitted={buildCommitted}
          rank={builderWallet?.rank || -1}
          topNominators={topNominators.slice(0, 3)}
        />
      ),
      buttons: [
        <Button
          action="link"
          key="1"
          target={getWarpcastSharableLinkAirdrop1(
            buildCommitted,
            currentUserAddress,
          )}
        >
          Share
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
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    return {
      image: (
        <NominateBuilderError
          farcasterUsername={farcasterUsername}
          farcasterPfp={farcasterPfp}
          builderImage={undefined}
          builderUsername={undefined}
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
