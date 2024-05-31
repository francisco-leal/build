import { Button } from "frames.js/next";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getUserBalances, getUserFromWallet } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { searchBuilders } from "@/app/_api/functions/search-builders";
import { frames, getFramesUser } from "@/app/frames/frames";
import { NominateBuilderDetails } from "@/shared/components/frames/nominate-builder-details";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
import { SearchBuilders } from "@/shared/components/frames/search-builder";
import { imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

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
          <SearchBuilders
            farcasterPfp={farcasterPfp}
            farcasterUsername={farcasterUsername}
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
            farcasterUsername={farcasterUsername}
            farcasterPfp={farcasterPfp}
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
          ...imageOptions,
          aspectRatio: "1:1",
        },
      };
    }
    const nominatedUser = await getUserFromWallet(walletProfile.wallet);
    if (!nominatedUser) {
      // create user to be nominated
      return {
        image: (
          <NominateBuilderError
            farcasterPfp={farcasterPfp}
            farcasterUsername={farcasterUsername}
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
          ...imageOptions,
          aspectRatio: "1:1",
        },
      };
    }
    const [todayNominations, userBalances] = await Promise.all([
      getNominationsFromUserToday(farcasterUser),
      getUserBalances(farcasterUser),
    ]);

    return {
      image: (
        <NominateBuilderDetails
          farcasterPfp={farcasterPfp}
          farcasterUsername={farcasterUsername}
          nominatedImage={walletProfile.image}
          nominatedUsername={walletProfile.username}
          nominatedWallet={walletNominated || ""}
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
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";
    if (errorMessage === "Frame user not found") {
      return {
        image: <SearchBuilders />,
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
    return {
      image: (
        <NominateBuilderError
          farcasterUsername={farcasterUsername}
          farcasterPfp={farcasterPfp}
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
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  }
});

export const GET = handler;
export const POST = handler;
