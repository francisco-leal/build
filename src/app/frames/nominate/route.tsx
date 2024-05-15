import { Button } from "frames.js/next";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { frames, getFramesUser } from "@/app/frames/frames";

const handler = frames(async (ctx) => {
  try {
    if (!ctx.message?.isValid) {
      // throw new BadRequestError("Invalid message");
    }

    const farcasterUser = await getFramesUser(ctx);
    const farcasterUsername = farcasterUser.username;
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    const walletNominated = ctx.message?.inputText;
    if (!walletNominated) {
      return {
        image: (
          <div>
            <div>nominate-builder</div>
            <div>{farcasterPfp}</div>
            <div>{farcasterUsername}</div>
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

    const walletProfile = await getWalletFromExternal(walletNominated);
    if (!walletProfile) {
      return {
        image: (
          <div>
            <div>nominate-builder-not-found</div>
            <div>{walletNominated}</div>
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
    const message = (error as Error)?.message || "An error occurred";
    return {
      image: (
        <div>
          <div>nomination-failed</div>
          <div>{message}</div>
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
  }
});

export const GET = handler;
export const POST = handler;
