/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { createNewNomination } from "@/app/_api/create-new-nomination";
import { getBuilder } from "@/app/_api/get-builder";
import { frames } from "@/app/frames/frames";

export async function findBuilderProfile(walletAddress: string) {
  const builderProfile = await getBuilder(walletAddress.toLowerCase());
  return builderProfile;
}

const handler = frames(async (ctx) => {
  if (!ctx.message?.isValid) {
    // throw new Error("Invalid message");
  }
  const userNominated = ctx.url.pathname.split("/frames/nominate/")[1] || "";
  let userAddress =
    ctx.message?.requesterVerifiedAddresses &&
    ctx.message?.requesterVerifiedAddresses.length > 0
      ? ctx.message?.requesterVerifiedAddresses[0]
      : ctx.message?.verifiedWalletAddress; // XMTP verified wallet
  userAddress = userAddress?.toLowerCase();

  if (!userNominated) {
    // user address to nominate not provided
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
      ],
      imageOptions: {
        aspectRatio: "1:1",
      },
    };
  } else {
    let nominatedBuilderProfile = null;
    try {
      nominatedBuilderProfile = await findBuilderProfile(userNominated);
    } catch (e: any) {
      // console.error("Error finding builder profile", e);
    }
    if (!!nominatedBuilderProfile) {
      if (!userAddress) {
        // nominated builder profile found but no user provided
        return {
          image: (
            <div>
              <div>nominate-builder</div>
              <div>
                {nominatedBuilderProfile?.image
                  ? nominatedBuilderProfile.image
                  : ""}
              </div>
              <div>
                {nominatedBuilderProfile?.username
                  ? nominatedBuilderProfile?.username
                  : nominatedBuilderProfile?.wallet}
              </div>
            </div>
          ),
          buttons: [
            <Button action="post" key="1" target={`/nominate/${userNominated}`}>
              Confirm Nomination
            </Button>,
          ],
          imageOptions: {
            aspectRatio: "1:1",
          },
        };
      } else {
        try {
          // proceed to nominate builder
          const newNomination = await createNewNomination(
            nominatedBuilderProfile.wallet,
            userAddress,
          );
          return {
            image: (
              <div>
                <div>builder-nominatation-completed</div>
                <div>{nominatedBuilderProfile?.image}</div>
                <div>{nominatedBuilderProfile?.username}</div>
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
        } catch (e: any) {
          console.log("Error nominating builder", e);
          return {
            image: (
              <div>
                <div>builder-nomination-error</div>
                <div>{nominatedBuilderProfile?.username}</div>
                <div>{e.message}</div>
                <div>{nominatedBuilderProfile?.image}</div>
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
        }
      }
    } else {
      return {
        image: (
          <div>
            <div>builder-nomination-error</div>
            <div>{userNominated}</div>
            <div>Builder not found</div>
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
    }
  }
});

export const GET = handler;
export const POST = handler;
