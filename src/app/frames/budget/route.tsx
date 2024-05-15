/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getUserBalances } from "@/app/_api/data/users";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames } from "@/app/frames/frames";

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    // throw new Error("Invalid message");
  }
  const farcasterUsername =
    ctx.message?.requesterUserData?.displayName ||
    ctx.message?.requesterFid ||
    ctx.message?.verifiedWalletAddress;

  const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
  const walletAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP wallet address

  if (!walletAddress) {
    return {
      image: (
        <div>
          <div>landing</div>
          <div>namo</div>
        </div>
      ),
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Nominate
        </Button>,
        <Button action="post" key="2" target="/budget">
          See my budget
        </Button>,
        <Button action="link" key="3" target="https://build.top/">
          Learn more
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  }
  const farcasterUser = await getConnectedUserProfile(walletAddress);
  const userBalances = await getUserBalances(farcasterUser);

  return {
    image: (
      <div>
        <div>budget</div>
        <div>{farcasterPfp}</div>
        <div>{farcasterUsername}</div>
        <div>{userBalances.dailyBudget}</div>
      </div>
    ),
    buttons: [
      <Button action="post" key="1" target="/nominate">
        Nominate
      </Button>,
      <Button action="post" key="2" target="/">
        Back
      </Button>,
      <Button
        action="link"
        key="3"
        target="https://passport.talentprotocol.com/"
      >
        Sign up for Builder Score
      </Button>,
    ],
    imageOptions: {
      aspectRatio: "1:1",
    },
  };
});

export const GET = handler;
export const POST = handler;
