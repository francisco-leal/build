import { Button } from "frames.js/next";
import { createNewNomination } from "@/app/_api/data/nominations";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  const walletNominated = ctx.url.pathname.split("/frames/nominate/")[1] ?? "";
  try {
    if (!ctx.message?.isValid) {
      // throw new BadRequestError("Invalid message");
    }
    const farcasterUser = await getFramesUser(ctx);
    const walletNominated = ctx.url.pathname.split("/frames/nominate/")[1];
    if (!walletNominated) throw new BadRequestError("Missing Wallet address");

    const walletInfo = await getWalletFromExternal(walletNominated).catch(
      (e) => null,
    );
    if (!walletInfo) throw new BadRequestError("Wallet not found");

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
        <Button action="post" key="1" target="/">
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
    const message = (error as Error)?.message || "An error occurred";
    return {
      image: (
        <div>
          <div>nominate-builder-not-found</div>
          <div>{walletNominated}</div>
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
