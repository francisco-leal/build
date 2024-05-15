/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { createNewNomination } from "@/app/_api/data/nominations";
import { getWallet } from "@/app/_api/data/wallets";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  const walletNominated = ctx.url.pathname.split("/frames/nominate/")[1] ?? "";
  try {
    if (!ctx.message?.isValid) {
      // throw new BadRequestError("Invalid message");
    }

    const walletNominated =
      ctx.url.pathname.split("/frames/nominate/")[1] ?? "";
    if (!walletNominated)
      throw new BadRequestError("Wallet address not provided");

    const walletInfo = await getWallet(walletNominated).catch((e) => null);
    if (!walletInfo) throw new BadRequestError("Wallet not found");

    const userAddress =
      ctx.message?.requesterVerifiedAddresses &&
      ctx.message?.requesterVerifiedAddresses.length > 0
        ? ctx.message?.requesterVerifiedAddresses[0]
        : ctx.message?.verifiedWalletAddress; // XMTP verified wallet
    if (!userAddress) throw new BadRequestError("User not found");

    const user = await getConnectedUserProfile(userAddress);
    await createNewNomination(user, walletInfo);

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
