/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import {
  getBossNominationBalances,
  getTodaysNominations,
} from "@/app/_api/create-new-nomination";
import { getOrCreateUser } from "@/app/_api/create-new-user";
import { frames } from "@/app/frames/frames";
import { searchFarcasterBuilderProfiles } from "@/services/farcaster";

export async function searchBuilderProfile(username: string) {
  const builderProfiles = await searchFarcasterBuilderProfiles(username);
  if (builderProfiles.length > 0) {
    return builderProfiles[0];
  }
  return null;
}

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    // throw new Error("Invalid message");
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
        <Button action="post" key="2" target="/">
          Back
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  } else {
    // proceed with nomination
    const nominatedBuilderProfile = await searchBuilderProfile(userNominated);
    const farcasterUser = await getOrCreateUser(userAddress!); // create a user for the voter if not found
    const todayNominations = await getTodaysNominations(farcasterUser.wallet!);
    const userBalances = await getBossNominationBalances(farcasterUser.wallet!);

    if (!!nominatedBuilderProfile) {
      // nominated builder profile found
      return {
        image: (
          <div>
            <div>nominate-builder-found</div>
            <div>{farcasterPfp}</div>
            <div>{farcasterUsername}</div>
            <div>
              {nominatedBuilderProfile?.profile_image
                ? nominatedBuilderProfile.profile_image
                : nominatedBuilderProfile?.pfp_url}
            </div>
            <div>
              {nominatedBuilderProfile?.display_name
                ? nominatedBuilderProfile?.display_name
                : nominatedBuilderProfile?.username}
            </div>
            <div>{userBalances.dailyBudget}</div>
            <div>{userBalances.pointsGiven}</div>
            <div>{userBalances.pointsEarned}</div>
            <div>{`${todayNominations.length}/3`}</div>
            {todayNominations.length >= 3 && (
              <div>You&apos;re out of nominations for today</div>
            )}
          </div>
        ),
        buttons:
          todayNominations.length < 3
            ? [
                <Button
                  action="post"
                  key="1"
                  target={`/nominate/${nominatedBuilderProfile.address.toLowerCase()}`}
                >
                  Confirm Nomination
                </Button>,
                <Button action="post" key="2" target={`/nominate`}>
                  Back
                </Button>,
              ]
            : [
                <Button action="post" key="1" target={`/`}>
                  Back
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
          <Button action="post" key="2" target="/">
            Back
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
