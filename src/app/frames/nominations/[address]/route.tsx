import { Button } from "frames.js/next";
import { getNominationsFromUserToday } from "@/app/_api/data/nominations";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames } from "@/app/frames/frames";
import { NominateBuilderError } from "@/shared/components/frames/nominate-builder-error";
import { appURL, imageOptions } from "@/shared/frames/utils";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  const userAddress =
    ctx.url.pathname.split("/frames/nominations/")[1].toLowerCase() ?? "";
  try {
    if (ctx.message && !ctx.message?.isValid) {
      throw new BadRequestError("Invalid message");
    }
    if (!userAddress) throw new BadRequestError("Missing Wallet address");

    const [currentUser, currentFarcasterUser] = await Promise.all([
      getConnectedUserProfile(userAddress),
      getFarcasterUser(userAddress),
    ]);
    if (!currentFarcasterUser) throw new BadRequestError("User not found");
    const dailyNominations = await getNominationsFromUserToday(currentUser);
    const nominatedUsers = await Promise.all(
      dailyNominations
        .reverse()
        .map((n) => getFarcasterUser(n.destinationWallet))
        .slice(0, 3),
    );
    return {
      image: (
        <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
          <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
          <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
            <div tw="flex flex-col text-white items-center p-[20px]">
              <div tw="flex p-[40px] mt-[50px] w-auto text-white">
                <img
                  src={currentFarcasterUser.pfp_url}
                  tw="w-[120px] h-[120px] rounded-full mr-[20px] object-cover"
                />
                <p
                  tw="font-bold text-[78px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {currentFarcasterUser.username}
                </p>
              </div>
              <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-15 border-r-15">
                <p
                  tw="font-bold text-[48px]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Daily Nominations
                </p>
              </div>
            </div>

            <div tw="flex flex-col w-auto text-white items-center mb-[50px] items-start gap-[20px] justify-start">
              {nominatedUsers.length > 0 ? (
                nominatedUsers.map((user, index) => (
                  <div
                    key={index}
                    tw="flex items-center mx-auto mb-[50px] w-auto text-white justify-center"
                  >
                    <img
                      src={user?.pfp_url ? user.pfp_url : ""}
                      tw="w-[100px] h-[100px] rounded-full mr-[20px] object-cover"
                    />
                    <p
                      tw="font-bold text-[64px]"
                      style={{ fontFamily: "Bricolage-Bold" }}
                    >
                      {user?.username ? user.username : " "}
                    </p>
                  </div>
                ))
              ) : (
                <div tw="flex flex-col mx-auto items-center">
                  <p tw="text-[48px]">No nominations yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ),
      buttons: [
        <Button action="post" key="1" target="/nominate">
          Nominate Builders
        </Button>,
      ],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  } catch (error) {
    const farcasterUsername = ctx.message?.requesterUserData?.displayName || "";
    const farcasterPfp = ctx.message?.requesterUserData?.profileImage || "";

    return {
      image: (
        <NominateBuilderError
          farcasterUsername={farcasterUsername}
          farcasterPfp={farcasterPfp}
          builderImage={undefined}
          builderUsername={`${userAddress.slice(0, 8)}...${userAddress.slice(-4)}`}
          errorTitle="Builder not found"
          errorMessage=""
        />
      ),
      buttons: [],
      imageOptions: {
        ...imageOptions,
        aspectRatio: "1:1",
      },
    };
  }
});

export const GET = handler;
export const POST = handler;
