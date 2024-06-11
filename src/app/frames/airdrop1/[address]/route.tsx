import { Button } from "frames.js/next";
import { getTopNominationsForUser } from "@/app/_api/data/nominations";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames } from "@/app/frames/frames";
import Airdrop1Details from "@/shared/components/frames/airdrop1-details";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
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
    if (!userAddress) throw new BadRequestError("Missing Wallet address");

    const [currentUser, currentFarcasterUser] = await Promise.all([
      getConnectedUserProfile(userAddress),
      getFarcasterUser(userAddress),
    ]);
    if (!currentFarcasterUser) throw new BadRequestError("User not found");
    const dailyNominations = await getTopNominationsForUser(currentUser);
    const nominatedUsers = await Promise.all(
      dailyNominations
        .reverse()
        .map((n) => getFarcasterUser(n.destinationWallet))
        .slice(0, 3),
    );
    const buildCommitted = 123400;
    const rank = 1463;
    return {
      image: (
        <Airdrop1Details
          currentFarcasterUser={currentFarcasterUser}
          buildCommitted={buildCommitted}
          rank={rank}
          nominatedUsers={nominatedUsers}
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
