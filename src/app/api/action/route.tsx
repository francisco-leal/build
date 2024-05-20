import { NextRequest } from "next/server";
import { ActionMetadata } from "frames.js";
import { frames } from "../../frames/frames";

export const GET = async (req: NextRequest) => {
  const actionMetadata: ActionMetadata = {
    action: {
      type: "post",
    },
    icon: "bold",
    name: "Build.top Nominate",
    aboutUrl: `https://build.top`,
    description: "Open a Frame to nominate for build.top",
  };

  return Response.json(actionMetadata);
};

export const POST = frames(async (ctx) => {
  const wallet = ctx.message?.requesterVerifiedAddresses
    ? ctx.message?.requesterVerifiedAddresses[0]
    : ctx.message?.requesterCustodyAddress;
  if (!wallet) {
    return Response.json({
      type: "frame",
      frameUrl: `https://build.top/`,
    });
  }
  return Response.json({
    type: "frame",
    frameUrl: `https://build.top/nominate/${wallet}`,
  });
});
