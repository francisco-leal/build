/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import {
  getBossNominationBalances,
  getTodaysNominations,
} from "@/app/_api/create-new-nomination";
import { getOrCreateUser } from "@/app/_api/create-new-user";
import { searchBuilders } from "@/app/_api/search-builders";
import { frames } from "@/app/frames/frames";

export async function findSocialProfile(walletAddress: string) {
  const socialProfiles = await searchBuilders(walletAddress, "farcaster");
  if (socialProfiles.length === 0) {
    return null;
  } else {
    return socialProfiles[0];
  }
}

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    throw new Error("Invalid message");
  }
  const userNominated = ctx.message?.inputText || "";
  const userAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP wallet address
  const farcasterUsername =
    ctx.message?.requesterUserData?.displayName ||
    ctx.message?.requesterFid ||
    ctx.message?.verifiedWalletAddress ||
    "";
  const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

  if (!userNominated) {
    // nominate a builder profile
    return {
      image: (
        <div>
          <div>nominate-builder</div>
          <div>{farcasterPfp}</div>
          <div>{farcasterUsername}</div>
        </div>
      ),
      textInput: "Search with farcaster handle",
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Search
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  } else {
    // proceed with nomination
    const nominatedSocialProfile = await findSocialProfile(userNominated);
    const farcasterUser = await getOrCreateUser(userAddress!);
    const todayNominations = await getTodaysNominations(userAddress!);
    const userBalances = await getBossNominationBalances(userAddress!);
    console.log(
      "current user",
      farcasterUser,
      userAddress,
      todayNominations,
      userBalances,
    );

    if (!!nominatedSocialProfile) {
      // nominated builder profile found
      return {
        image: (
          <div>
            <div>nominate-builder-found</div>
            <div>{farcasterPfp}</div>
            <div>{farcasterUsername}</div>
            <div>
              {nominatedSocialProfile?.profile_image
                ? nominatedSocialProfile.profile_image
                : nominatedSocialProfile?.pfp_url}
            </div>
            <div>
              {nominatedSocialProfile?.display_name
                ? nominatedSocialProfile?.display_name
                : nominatedSocialProfile?.username}
            </div>
            <div>{userBalances.dailyBudget}</div>
            <div>{userBalances.pointsGiven}</div>
            <div>{userBalances.pointsEarned}</div>
            <div>{`${todayNominations.length}/3`}</div>
          </div>
        ),
        buttons: [
          <Button action="post" key="1" target={`/nominate/${userNominated}`}>
            Confirm Nomination
          </Button>,
        ],
        imageOptions: {
          aspectRatio: "1:1",
        },
      };
    } else {
      // nominated builder profile NOT found
      return {
        image: (
          <div>
            <div>nominate-builder-not-found</div>
            <div>{userNominated}</div>
          </div>
        ),
        textInput: "Search with farcaster handle",
        buttons: [
          <Button action="post" key="1" target="/nominate">
            Search
          </Button>,
        ],
        imageOptions: {
          aspectRatio: "1:1",
        },
      };
    }
  }
});

export const GET = handler;
export const POST = handler;
