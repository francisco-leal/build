/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getUserBalances } from "@/app/_api/data/users";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  try {
    if (!ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    const farcasterUsername =
      ctx.message?.requesterUserData?.displayName ||
      ctx.message?.requesterFid ||
      ctx.message?.verifiedWalletAddress;
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
    const farcasterUser = await getFramesUser(ctx);
    const userBalances = await getUserBalances(farcasterUser);

    return {
      image: (
        <div>
          <div>budget</div>
          <div>{farcasterPfp}</div>
          <div>{farcasterUser.username || farcasterUsername}</div>
          <div>{userBalances.dailyBudget.toFixed(2)}</div>
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
          Builder Score
        </Button>,
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    return {
      image: (
        <div>
          <div>landing</div>
          <div>{errorMessage}</div>
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
});

export const GET = handler;
export const POST = handler;
