/* eslint-disable react/jsx-key */
import React from "react";
import { Button } from "frames.js/next";
import { frames } from "@/app/frames/frames";
import { appURL, imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    // throw new BadRequestError("Invalid message");
  }

  return {
    image: `${appURL()}/images/frame-landing.png`,
    buttons: [
      <Button action="post" key="1" target="/nominate">
        Nominate
      </Button>,
      <Button action="post" key="2" target="/budget">
        See my budget
      </Button>,
      <Button action="link" key="3" target="https://www.build.top/airdrop1">
        Check eligibility
      </Button>,
    ],
    imageOptions: {
      ...imageOptions,
      aspectRatio: "1:1",
    },
  };
});

export const GET = handler;
export const POST = handler;
