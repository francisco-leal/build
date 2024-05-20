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
    console.log("here");
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
  console.log({ dailyNominations });
  const [firstUser, secondUser, thirdUser] = await Promise.all(
    dailyNominations.map((n) => getFarcasterUser(n.destinationWallet)),
  );
  return {
    image: (
      <div>
        <div>builder-daily-nominations</div>
        <div>{currentFarcasterUser.username}</div>
        <div>{currentFarcasterUser.pfp_url}</div>
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
