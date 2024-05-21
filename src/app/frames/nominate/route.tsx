import fs from "node:fs";
import path from "node:path";
import { Button } from "frames.js/next";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { searchBuilders } from "@/app/_api/functions/search-builders";
import { frames, getFramesUser } from "@/app/frames/frames";
import { appURL } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const frameDefaultUser = fs.readFileSync(
  path.join(
    path.resolve(process.cwd(), "public", "images"),
    "frame-default-user.png",
  ),
);

type INominateFrameProps = {
  farcasterPfp: string | undefined;
  farcasterUsername: string | null;
  nominatedImage: string | undefined;
  nominatedUsername: string;
  dailyBudget: number | undefined;
  pointsGiven: number | undefined;
  pointsEarned: number | undefined;
  todayNominations: number | undefined;
};

export const NominateFrame = ({
  farcasterPfp,
  farcasterUsername,
  nominatedImage,
  nominatedUsername,
  dailyBudget,
  pointsGiven,
  pointsEarned,
  todayNominations,
}: INominateFrameProps) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
        <div tw="flex items-center">
          {!!farcasterPfp ? (
            <img
              src={farcasterPfp}
              tw="w-[70px] h-[70px] rounded-full mr-[20px] object-cover"
            />
          ) : null}
          <p
            tw="text-[52px] font-bold"
            style={{ fontFamily: "Bricolage-Bold" }}
          >
            {farcasterUsername}
          </p>
        </div>
        <div
          tw={`flex flex-col items-center justify-center ${dailyBudget ? "mt-[60px]" : "mt-[300px]"}`}
        >
          <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
            <p
              tw="text-[48px] font-bold"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Nominate
            </p>
          </div>
          <div tw="flex p-[20px] text-white w-auto">
            <img
              src={nominatedImage}
              tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
            />
            <p
              tw="text-[78px] font-bold"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              {nominatedUsername}
            </p>
          </div>
          {dailyBudget ? (
            <div tw="px-[20px] flex flex-col gap-0 w-full">
              <div tw="flex justify-between w-full border-t-[3px] border-white">
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  My Daily Budget
                </p>
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {dailyBudget.toFixed(2)}
                </p>
              </div>
              <div tw="flex justify-between w-full">
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  BUILD Points Sent
                </p>
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {pointsGiven?.toFixed(2)}
                </p>
              </div>
              <div tw="flex justify-between w-full">
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  BUILD Points Earned
                </p>
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {pointsEarned?.toFixed(2)}
                </p>
              </div>
              <div tw="flex justify-between w-full border-t-[3px] border-white">
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Daily Nominations
                </p>
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {`${todayNominations}/3`}
                </p>
              </div>
            </div>
          ) : null}
          {todayNominations && todayNominations >= 3 ? (
            <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
              <p
                tw="text-[48px] font-bold"
                style={{ fontFamily: "Bricolage-Bold" }}
              >
                You&apos;re out of nominations for today
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const NominateBuilderError = ({
  builderImage,
  builderUsername,
  errorTitle,
  errorMessage,
}: {
  builderImage: string | undefined;
  builderUsername: string | undefined;
  errorTitle: string;
  errorMessage: string | undefined;
}) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col p-[20px]">
        <div tw="flex flex-col gap-4 justify-center items-center h-full mx-auto">
          <div tw="flex px-[20px] w-auto text-white mb-[50px] items-center">
            {builderImage ? (
              <img
                src={builderImage}
                tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
              />
            ) : null}
            <p
              tw="text-[78px] font-bold"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              {builderUsername
                ? builderUsername.length > 15
                  ? `${builderUsername.slice(0, 15)}...`
                  : builderUsername
                : ""}
            </p>
          </div>
          <div tw="w-auto flex px-[20px] bg-white text-[#0042F5] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
            <p
              tw="text-[48px] font-bold"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              {errorTitle}
            </p>
          </div>
          {errorMessage ? (
            <div tw="w-auto flex px-[20px] text-white mb-[50px] justify-center items-center">
              <p
                tw="text-[78px] font-bold text-center mx-auto"
                style={{ fontFamily: "Bricolage-Bold" }}
              >
                {errorMessage}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const handler = frames(async (ctx) => {
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    const farcasterUser = await getFramesUser(ctx);
    const farcasterUsername = farcasterUser.username;
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    const userNominated = ctx.message?.inputText;
    let walletNominated = ctx.url.searchParams.get("wallet")?.toLowerCase();
    if (!userNominated && !walletNominated) {
      return {
        image: (
          <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
            <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
            <div tw="absolute top-0 left-0 w-full h-full flex flex-col p-[20px]">
              <div tw="flex flex-col gap-4 justify-center items-center h-full mx-auto">
                <div tw="flex px-[20px] w-auto text-white">
                  {!!farcasterPfp ? (
                    <img
                      src={farcasterPfp}
                      tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
                    />
                  ) : (
                    <img
                      src={`data:image/png;base64,${frameDefaultUser.toString("base64")}`}
                      tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
                    />
                  )}
                  <p
                    tw="text-[60px] font-bold"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    {!!farcasterUsername ? farcasterUsername : ""}
                  </p>
                </div>
                <div tw="flex px-[20px] bg-white text-[#0042F5] w-[600px] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
                  <p
                    tw="text-[48px] font-bold mx-auto"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    Search for builders
                  </p>
                </div>
              </div>
            </div>
          </div>
        ),
        textInput: "Search with farcaster handle",
        buttons: [
          <Button action="post" key="1" target="/nominate">
            Search
          </Button>,
          <Button action="post" key="2" target="/">
            Back
          </Button>,
        ],
        imageOptions: {
          aspectRatio: "1:1",
        },
      };
    }

    if (!walletNominated && userNominated) {
      const builderProfiles = await searchBuilders(userNominated, "farcaster");
      if (!builderProfiles || builderProfiles.length === 0) {
        throw new BadRequestError("Builder not found");
      }
      walletNominated = builderProfiles[0].wallet;
    }
    const walletProfile = await getWalletFromExternal(walletNominated!);
    if (!walletProfile) {
      return {
        image: (
          <NominateBuilderError
            builderImage={undefined}
            builderUsername={userNominated}
            errorTitle="Builder not found"
            errorMessage=""
          />
        ),
        textInput: "Search with farcaster handle",
        buttons: [
          <Button action="post" key="1" target="/nominate">
            Search
          </Button>,
          <Button action="post" key="2" target="/">
            Back
          </Button>,
        ],
        imageOptions: {
          aspectRatio: "1:1",
        },
      };
    }

    const todayNominations = await getNominationsFromUserToday(farcasterUser);
    const userBalances = await getUserBalances(farcasterUser);

    return {
      image: (
        <NominateFrame
          farcasterPfp={farcasterPfp}
          farcasterUsername={farcasterUsername}
          nominatedImage={walletProfile.image}
          nominatedUsername={walletProfile.username}
          dailyBudget={userBalances.dailyBudget}
          pointsGiven={userBalances.pointsGiven}
          pointsEarned={userBalances.pointsEarned}
          todayNominations={todayNominations.length}
        />
      ),
      buttons:
        todayNominations.length < 3
          ? [
              <Button
                action="post"
                key="1"
                target={`/nominate/${walletProfile.wallet}`}
              >
                Confirm Nomination
              </Button>,
              <Button action="post" key="2" target={`/nominate`}>
                Back
              </Button>,
            ]
          : [
              <Button action="post" key="1" target={`/`}>
                Back
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
        <NominateBuilderError
          builderImage={undefined}
          builderUsername={""}
          errorTitle="Builder Nomination Error"
          errorMessage={errorMessage}
        />
      ),
      textInput: "Search with farcaster handle",
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Search
        </Button>,
        <Button action="post" key="2" target="/">
          Back
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
