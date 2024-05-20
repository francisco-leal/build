import { Button } from "frames.js/next";
import {
  createNewNomination,
  getNominationsFromUserToday,
} from "@/app/_api/data/nominations";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  const userAddress =
    ctx.url.pathname.split("/frames/nominations/")[1].toLowerCase() ?? "";
  if (ctx.message && !ctx.message?.isValid) {
    throw new BadRequestError("Invalid message");
  }
  if (!userAddress) throw new BadRequestError("Missing Wallet address");
  const farcasterUser = await getConnectedUserProfile(userAddress);
  if (!farcasterUser) throw new BadRequestError("User not found");
  const dailyNominations = await getNominationsFromUserToday(farcasterUser);
  return {
    image: (
      <div>
        <div>builder-daily-nominations</div>
        <div>{farcasterUser.}</div>
        <div>{errorMessage}</div>
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
});

export const GET = handler;
export const POST = handler;
