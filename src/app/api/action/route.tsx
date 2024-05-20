import { NextRequest } from "next/server";
import { ActionMetadata } from "frames.js";
import {
  getFarcasterUser,
  getFarcasterUserById,
} from "@/app/_api/external/farcaster";
import { frames } from "../../frames/frames";

export const GET = async (req: NextRequest) => {
  const actionMetadata: ActionMetadata = {
    action: {
      type: "post",
    },
    icon: "diamond",
    name: "Nominate Builder",
    aboutUrl: `https://build.top`,
    description: "Opens a frame to nominate on build.top and earn BUILD.",
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async (ctx) => {
  const castAuthorFid = ctx.message?.castId?.fid;
  const castAuthor = await getFarcasterUserById(castAuthorFid!);
  if (!castAuthor) {
    return Response.json({
      type: "frame",
      frameUrl: `https://build.top/`,
    });
  }
  return Response.json({
    type: "frame",
    frameUrl: `https://build.top/nominate/${castAuthor?.verified_addresses?.eth_addresses[0] || castAuthor?.custody_address}`,
  });
});
