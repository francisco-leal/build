import { Button } from "frames.js/next";
import {
  createNewNomination,
  getNominationsCountForUser,
} from "@/app/_api/data/nominations";
import { getUserFromWallet } from "@/app/_api/data/users";
import { createWallet, getWalletFromExternal } from "@/app/_api/data/wallets";
import { frames, getFramesUser } from "@/app/frames/frames";
import { NominateBuilder } from "@/shared/components/frames/nominate-builder";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
import { appURL, imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";
import { getWarpcastSharableLinkSingleBuilder } from "@/shared/utils/sharable-warpcast-link";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const handler = frames(async (ctx) => {
  const walletNominated =
    ctx.url.pathname.split("/frames/nominate/")[1].toLowerCase() ?? "";
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
    return {
      image: (
        <NominateBuilderError
          farcasterUsername={null}
          farcasterPfp={undefined}
          builderImage={farcasterPfp}
          builderUsername={farcasterUsername}
          errorTitle="Nominations Paused"
          errorMessage="Nominations are paused while Airdrop 1 is being calculated"
        />
      ),
      buttons: [
        <Button action="link" key="1" target="https://www.build.top/airdrop1">
          Check eligibility
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
    /*
    const farcasterUser = await getFramesUser(ctx);
    if (!walletNominated) throw new BadRequestError("Missing Wallet address");

    const walletInfo = await getWalletFromExternal(walletNominated).catch(
      (e) => null,
    );
    if (!walletInfo) throw new BadRequestError("Wallet not found");

    await createWallet(walletInfo.wallet);
    await createNewNomination(farcasterUser, walletInfo);
    const sharableWarpcastLink = getWarpcastSharableLinkSingleBuilder(
      walletInfo?.username || "",
    );
    return {
      image: (
        <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
          <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
          <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
            <div tw="flex flex-col w-full h-full justify-center items-center">
              <div tw="flex items-center text-center px-[20px] w-auto text-white mb-[50px]">
                <img
                  src={walletInfo.image}
                  tw="w-[120px] h-[120px] rounded-full mr-[20px]"
                  style={{ objectFit: "cover" }}
                />
                <p
                  tw="font-bold text-[78px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {walletInfo.username}
                </p>
              </div>
              <div tw="flex px-[20px] bg-white text-[#0042F5] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  Builder Nominated
                </p>
              </div>
              <div tw="flex w-full text-center items-center justify-center">
                <svg
                  width="38"
                  height="38"
                  viewBox="0 0 38 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.8 7.6L3.8 30.4H0L9.9662e-07 7.6H3.8Z"
                    fill="#FBFCFE"
                  />
                  <path
                    d="M15.2 7.6L15.2 30.4H11.4L11.4 7.6H15.2Z"
                    fill="#FBFCFE"
                  />
                  <path d="M26.6 11.4V17.1H22.8V11.4H26.6Z" fill="#FBFCFE" />
                  <path d="M26.6 20.9V26.6H22.8V20.9H26.6Z" fill="#FBFCFE" />
                  <path d="M22.8 7.6V11.4H15.2V7.6H22.8Z" fill="#FBFCFE" />
                  <path d="M22.8 17.1V20.9H15.2V17.1H22.8Z" fill="#FBFCFE" />
                  <path
                    d="M22.8 26.6V30.4H15.2L15.2 26.6H22.8Z"
                    fill="#FBFCFE"
                  />
                  <path d="M7.6 3.8V7.6L3.8 7.6V3.8H7.6Z" fill="#FBFCFE" />
                  <path d="M34.2 3.8V7.6L30.4 7.6V3.8H34.2Z" fill="#FBFCFE" />
                  <path d="M7.6 30.4V34.2H3.8L3.8 30.4H7.6Z" fill="#FBFCFE" />
                  <path d="M34.2 30.4V34.2H30.4V30.4H34.2Z" fill="#FBFCFE" />
                  <path d="M30.4 34.2V38H7.6V34.2H30.4Z" fill="#FBFCFE" />
                  <path
                    d="M30.4 9.9662e-07V3.8H7.6V0L30.4 9.9662e-07Z"
                    fill="#FBFCFE"
                  />
                  <path d="M38 7.6V30.4H34.2V7.6L38 7.6Z" fill="#FBFCFE" />
                </svg>
                <p
                  tw="text-[48px] text-[#FBFCFE] ml-[10px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Build
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      buttons: [
        <Button action="link" key="1" target={sharableWarpcastLink}>
          Share
        </Button>,
        <Button action="post" key="2" target="/nominate">
          Nominate a new builder
        </Button>,
        <Button action="link" key="3" target="https://build.top/">
          Learn More
        </Button>,
      ],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
    */
  } catch (error) {
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
    return {
      image: (
        <NominateBuilderError
          farcasterUsername={null}
          farcasterPfp={undefined}
          builderImage={farcasterPfp}
          builderUsername={farcasterUsername}
          errorTitle="Nominations Paused"
          errorMessage="Nominations are paused while Airdrop 1 is being calculated cane"
        />
      ),
      buttons: [
        <Button action="link" key="1" target="https://www.build.top/airdrop1">
          Check eligibility
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
    /*
    const errorMessage = (error as Error)?.message || "An error occurred";
    const farcasterUsername =
      ctx.message?.requesterUserData?.displayName ||
      ctx.message?.requesterFid.toString() ||
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
              farcasterPfp={farcasterPfp}
              farcasterUsername={farcasterUsername || null}
              builderImage={undefined}
              builderUsername={abbreviateWalletAddress(walletNominated)}
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
          <NominateBuilder
            farcasterPfp={farcasterPfp.toString() || undefined}
            farcasterUsername={farcasterUsername?.toString() || null}
            nominatedImage={walletProfile.image}
            nominatedUsername={walletProfile.username}
            nominatedWallet={walletNominated || ""}
            nominatedBio={walletProfile.bio || ""}
            nominatedBuilderScore={walletProfile.builderScore || 0}
            nominatedUserNominationsReceived={nominationsReceived}
            nominatedBuildPoints={nominatedUser?.boss_score || 0}
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
    const hasShareButton =
      errorMessage === "You already nominated this builder before!";
    const sharableWarpcastLink = hasShareButton
      ? getWarpcastSharableLinkSingleBuilder(walletProfile?.username || "")
      : "";
    return {
      image: (
        <NominateBuilderError
          farcasterPfp={farcasterPfp.toString() || undefined}
          farcasterUsername={farcasterUsername?.toString() || null}
          builderImage={walletProfile?.image || undefined}
          builderUsername={
            walletProfile?.username || abbreviateWalletAddress(walletNominated)
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
        hasShareButton ? (
          <Button action="link" key="2" target={sharableWarpcastLink}>
            Share
          </Button>
        ) : undefined,
      ],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
    */
  }
});

export const GET = handler;
export const POST = handler;
