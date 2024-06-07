/* eslint-disable react/jsx-key */
import fs from "node:fs";
import path from "node:path";
import { Button } from "frames.js/next";
import { getUserBalances } from "@/app/_api/data/users";
import { frames, getFramesUser } from "@/app/frames/frames";
import { appURL, imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";
import { formatLargeNumber } from "@/shared/utils/format-number";

const frameDice = fs.readFileSync(
  path.join(path.resolve(process.cwd(), "public", "images"), "frame-dice.png"),
);

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
        <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
          <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
          <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[45px]">
            <div tw="flex flex-row items-center">
              <img
                src={farcasterPfp}
                alt="profile image"
                tw="w-[72px] h-[72px] rounded-full mr-[20px]"
                style={{ objectFit: "cover" }}
              />
              <p
                tw="text-[60px]"
                style={{
                  fontFamily: "Bricolage-Bold",
                }}
              >
                {farcasterUser.username || farcasterUsername}
              </p>
            </div>
            <div tw="w-full h-full -mt-[100px] flex flex-col items-center justify-center">
              <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-4 border-l-4 border-b-[15px] border-r-[15px]">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  Daily Points budget
                </p>
              </div>
              <div tw="w-full flex px-[20px] text-white bg-[#0042F5] items-center justify-center">
                <img
                  src={`data:image/png;base64,${frameDice.toString("base64")}`}
                  height={"136px"}
                  width={"132px"}
                />
                <p
                  tw="ml-[50px] text-[188px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {formatLargeNumber(userBalances.dailyBudget)}
                </p>
              </div>
              <div tw="flex px-[20px] w-auto text-white">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  Increase budget 10x with Builder Score.
                </p>
              </div>
            </div>
          </div>
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
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    console.error(errorMessage);
    return {
      image: `${appURL()}/images/frame-landing.png`,
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
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  }
});

export const GET = handler;
export const POST = handler;
