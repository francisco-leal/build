/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getBossNominationBalances } from "@/app/_api/create-new-nomination";
import { frames } from "@/app/frames/frames";

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    throw new Error("Invalid message");
  }
  const farcasterUsername =
    ctx.message?.requesterUserData?.displayName ||
    ctx.message?.requesterFid ||
    ctx.message?.verifiedWalletAddress;

  const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
  const userAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP wallet address
  const userBalances = await getBossNominationBalances(userAddress!);

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
