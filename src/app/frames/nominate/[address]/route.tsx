/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import {
  createNewNomination,
  getBossNominationBalances,
  getTodaysNominations,
} from "@/app/_api/create-new-nomination";
import { getOrCreateUser } from "@/app/_api/create-new-user";
import { frames } from "@/app/frames/frames";
import { findSocialProfile } from "../route";

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    throw new Error("Invalid message");
  }
  const userNominated = ctx.url.pathname.split("/frames/nominate/")[1] || "";
  const userAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP verified wallet

  if (!userNominated) {
    // user address to nominate not provided
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
  } else {
    const nominatedSocialProfile = await findSocialProfile(userNominated);
    if (!!nominatedSocialProfile) {
      if (!userAddress) {
        // nominated builder profile found
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
        const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
        const farcasterUsername =
          ctx.message?.requesterUserData?.displayName ||
          ctx.message?.requesterFid ||
          ctx.message?.verifiedWalletAddress ||
          "";
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
      }
      try {
        const newNomination = await createNewNomination(
          nominatedSocialProfile.address,
          userAddress,
        );
        return {
          image: (
            <div>
              <div>builder-nominatation-completed</div>
              <div>{nominatedSocialProfile?.profile_image}</div>
              <div>{nominatedSocialProfile?.username}</div>
            </div>
          ),
          buttons: [
            <Button action="post" key="1" target="/">
              Nominate a new builder
            </Button>,
            <Button action="link" key="1" target="https://boss.community">
              Learn More
            </Button>,
          ],
          imageOptions: {
            aspectRatio: "1:1",
          },
        };
      } catch (e: any) {
        console.log("builder-nomination-error", e);
        return {
          image: (
            <div>
              <div>builder-nomination-error</div>
              <div>{nominatedSocialProfile?.username}</div>
              <div>{nominatedSocialProfile?.profile_image}</div>
            </div>
          ),
          buttons: [
            <Button action="post" key="1" target="/">
              Nominate a new builder
            </Button>,
            <Button action="link" key="1" target="https://boss.community">
              Learn More
            </Button>,
          ],
          imageOptions: {
            aspectRatio: "1:1",
          },
        };
      }
    }
    return {
      image: (
        <div>
          <div>builder-nomination-error</div>
          <div>{userNominated}</div>
        </div>
      ),
      buttons: [
        <Button action="post" key="1" target="/">
          Nominate a new builder
        </Button>,
        <Button action="link" key="1" target="https://boss.community">
          Learn More
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  }
});

export const GET = handler;
export const POST = handler;
