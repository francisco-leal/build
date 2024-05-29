import { Button } from "frames.js/next";
import {
  createNewNomination,
  getNominationsCountForUser,
} from "@/app/_api/data/nominations";
import { getUserFromWallet } from "@/app/_api/data/users";
import { createWallet, getWalletFromExternal } from "@/app/_api/data/wallets";
import { frames, getFramesUser } from "@/app/frames/frames";
import { appURL, imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";
import { NominateBuilderError, NominateFrame } from "../route";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const handler = frames(async (ctx) => {
  const walletNominated =
    ctx.url.pathname.split("/frames/nominate/")[1].toLowerCase() ?? "";
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    const farcasterUser = await getFramesUser(ctx);
    if (!walletNominated) throw new BadRequestError("Missing Wallet address");

    const walletInfo = await getWalletFromExternal(walletNominated).catch(
      (e) => null,
    );
    if (!walletInfo) throw new BadRequestError("Wallet not found");

    await createWallet(walletInfo.wallet);
    await createNewNomination(farcasterUser, walletInfo);

    return {
      image: (
        <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
          <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
          <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
            <div tw="flex flex-col w-full h-full justify-center items-center">
              <div tw="flex flex-row px-[20px] w-auto text-white mb-[50px]">
                <img
                  src={walletInfo.image}
                  tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
                />
                <p
                  tw="font-bold text-[78px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {walletInfo.username}
                </p>

                <p
                  tw="font-bold text-[78px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {walletInfo.rank}
                </p>
              </div>
              <div tw="flex px-[20px] bg-white text-[#0042F5] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
                <p
                  tw="text-[48px] font-bold"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Builder Nominated
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Nominate a new builder
        </Button>,
        <Button action="link" key="1" target="https://build.top/">
          Learn More
        </Button>,
      ],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    const farcasterUsername =
      ctx.message?.requesterUserData?.displayName ||
      ctx.message?.requesterFid ||
      ctx.message?.verifiedWalletAddress;
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
    let walletProfile = null;
    let nominatedUser = null;
    try {
      walletProfile = await getWalletFromExternal(walletNominated);
      nominatedUser = await getUserFromWallet(
        walletProfile?.wallet || walletNominated,
      );
    } catch (error) {}
    if (errorMessage === "Frame user not found") {
      if (!walletProfile || !nominatedUser) {
        return {
          image: (
            <NominateBuilderError
              builderImage={undefined}
              builderUsername={`${walletNominated.slice(0, 8)}...${walletNominated.slice(-4)}`}
              errorTitle="Builder Not Found"
              errorMessage={undefined}
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
            ...imageOptions,
            aspectRatio: "1:1",
          },
        };
      }
      const nominationsReceived =
        await getNominationsCountForUser(nominatedUser);

      return {
        image: (
          <NominateFrame
            farcasterPfp={farcasterPfp.toString() || undefined}
            farcasterUsername={farcasterUsername?.toString() || null}
            nominatedImage={walletProfile.image}
            nominatedUsername={walletProfile.username}
            nominatedWallet={walletNominated || ""}
            nominatedBio={walletProfile.bio || ""}
            nominatedBuilderScore={walletProfile.builderScore || 0}
            nominatedUserNominationsReceived={nominationsReceived}
            nominatedBuildPoints={nominatedUser?.boss_score || 0}
            dailyBudget={undefined}
            pointsGiven={undefined}
            pointsEarned={undefined}
            todayNominations={undefined}
          />
        ),
        buttons: [
          <Button
            action="post"
            key="1"
            target={`/nominate?wallet=${walletProfile.wallet}`}
          >
            Nominate
          </Button>,
          <Button action="post" key="2" target={`/nominate`}>
            Search another builder
          </Button>,
        ],
        imageOptions: {
          ...imageOptions,
          aspectRatio: "1:1",
        },
      };
    }
    return {
      image: (
        <NominateBuilderError
          builderImage={walletProfile?.image || undefined}
          builderUsername={
            walletProfile?.username ||
            `${walletNominated.slice(0, 8)}...${walletNominated.slice(-4)}`
          }
          errorTitle="Builder Nomination Error"
          errorMessage={errorMessage}
        />
      ),
      textInput: "Search with farcaster handle",
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Search
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
