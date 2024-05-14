/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getBossNominationBalances } from "@/app/_api/create-new-nomination";
import { getOrCreateUser } from "@/app/_api/create-new-user";
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
  const userAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP wallet address

  if (!userAddress) {
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
  const farcasterUser = await getOrCreateUser(userAddress!); // create a user for the voter if not found
  const userBalances = await getBossNominationBalances(farcasterUser.wallet);

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
