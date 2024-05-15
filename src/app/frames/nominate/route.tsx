import { Button } from "frames.js/next";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { searchBuilders } from "@/app/_api/functions/search-builders";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    throw new BadRequestError("Invalid message");
  }
  try {
    const farcasterUser = await getFramesUser(ctx);
    const farcasterUsername = farcasterUser.username;
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    const userNominated = ctx.message?.inputText?.toLowerCase().trim();
    if (!userNominated) {
      return {
        image: (
          <div>
            <div>nominate-builder</div>
            <div>{farcasterPfp}</div>
            <div>{!!farcasterUsername ? farcasterUsername : ""}</div>
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

    const builderProfiles = await searchBuilders(userNominated, "farcaster");
    let nominatedBuilderProfile =
      builderProfiles.length > 0 ? builderProfiles[0] : null;
    if (!nominatedBuilderProfile) {
      throw new BadRequestError("Builder not found");
    }
    const walletProfile = await getWalletFromExternal(
      nominatedBuilderProfile.wallet,
    );
    if (!walletProfile) {
      return {
        image: (
          <div>
            <div>nominate-builder-not-found</div>
            <div>{userNominated}</div>
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

    const todayNominations = await getNominationsFromUserToday(farcasterUser);
    const userBalances = await getUserBalances(farcasterUser);

    return {
      image: (
        <div>
          <div>nominate-builder-found</div>
          <div>{farcasterPfp}</div>
          <div>{farcasterUsername}</div>
          <div>{walletProfile.image}</div>
          <div>{walletProfile.username}</div>
          <div>{userBalances.dailyBudget}</div>
          <div>{userBalances.pointsGiven}</div>
          <div>{userBalances.pointsEarned}</div>
          <div>{`${todayNominations.length}/3`}</div>
          {todayNominations.length >= 3 && (
            <div>You&apos;re out of nominations for today</div>
          )}
        </div>
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
        <div>
          <div>nomination-failed</div>
          <div>{errorMessage}</div>
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
});

export const GET = handler;
export const POST = handler;
