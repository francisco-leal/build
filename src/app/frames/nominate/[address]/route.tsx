import { Button } from "frames.js/next";
import { createNewNomination } from "@/app/_api/data/nominations";
import { createWallet, getWalletFromExternal } from "@/app/_api/data/wallets";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

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
        <div>
          <div>builder-nominatation-completed</div>
          <div>{walletInfo.image}</div>
          <div>{walletInfo.username}</div>
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
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const errorMessage = (error as Error)?.message || "An error occurred";
    if (errorMessage === "Frame user not found") {
      try {
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

        return {
          image: (
            <div>
              <div>nominate-builder-found</div>
              <div>{""}</div>
              <div>{""}</div>
              <div>{walletProfile.image}</div>
              <div>{walletProfile.username}</div>
              <div>{-1}</div>
              <div>{-1}</div>
              <div>{-1}</div>
              <div>{` `}</div>
            </div>
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
            aspectRatio: "1:1",
          },
        };
      } catch (error) {}
    }
    return {
      image: (
        <div>
          <div>builder-nomination-error</div>
          <div>{walletNominated}</div>
          <div>{errorMessage}</div>
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
