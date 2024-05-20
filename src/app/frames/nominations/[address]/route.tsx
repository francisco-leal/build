import { Button } from "frames.js/next";
import {
  createNewNomination,
  getNominationsFromUserToday,
} from "@/app/_api/data/nominations";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  if (ctx.message && !ctx.message?.isValid) {
    throw new BadRequestError("Invalid message");
  }
  const userAddress =
    ctx.url.pathname.split("/frames/nominations/")[1].toLowerCase() ?? "";
  if (!userAddress) throw new BadRequestError("Missing Wallet address");

  const [currentUser, currentFarcasterUser] = await Promise.all([
    getConnectedUserProfile(userAddress),
    getFarcasterUser(userAddress),
  ]);
  if (!currentFarcasterUser) throw new BadRequestError("User not found");
  const dailyNominations = await getNominationsFromUserToday(currentUser);
  const [firstUser, secondUser, thirdUser] = await Promise.all(
    dailyNominations
      .reverse()
      .map((n) => getFarcasterUser(n.destinationWallet)),
  );
  return {
    image: (
      <div>
        <div>builder-daily-nominations</div>
        <div>{currentFarcasterUser.username}</div>
        <div>{currentFarcasterUser.pfp_url}</div>
        <div>{firstUser?.username}</div>
        <div>{firstUser?.pfp_url}</div>
        <div>{secondUser?.username}</div>
        <div>{secondUser?.pfp_url}</div>
        <div>{thirdUser?.username}</div>
        <div>{thirdUser?.pfp_url}</div>
      </div>
    ),
    buttons: [
      <Button action="post" key="1" target="/">
        Nominate Builders
      </Button>,
    ],
    imageOptions: {
      aspectRatio: "1:1",
    },
  };
});

export const GET = handler;
export const POST = handler;