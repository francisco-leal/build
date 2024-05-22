import { Button } from "frames.js/next";
import {
  createNewNomination,
  getNominationsFromUserToday,
} from "@/app/_api/data/nominations";
import { getFarcasterUser } from "@/app/_api/external/farcaster";
import { getConnectedUserProfile } from "@/app/_api/functions/authentication";
import { frames, getFramesUser } from "@/app/frames/frames";
import { BadRequestError } from "@/shared/utils/error";

const handler = frames(async (ctx) => {
  if (ctx.message && !ctx.message?.isValid) {
    throw new BadRequestError("Invalid message");
  }
  const userAddress =
    ctx.url.pathname.split("/frames/nominations/")[1].toLowerCase() ?? "";
  if (!userAddress) throw new BadRequestError("Missing Wallet address");

  const [currentUser, currentFarcasterUser] = await Promise.all([
    getConnectedUserProfile(userAddress),
    getFarcasterUser(userAddress),
  ]);
  if (!currentFarcasterUser) throw new BadRequestError("User not found");
  const dailyNominations = await getNominationsFromUserToday(currentUser);
  const [firstUser, secondUser, thirdUser] = await Promise.all(
    dailyNominations
      .reverse()
      .map((n) => getFarcasterUser(n.destinationWallet)),
  );
  const nominatedUsers = [
    { username: firstUser?.username, imgUrl: firstUser?.pfp_url },
    { username: secondUser?.username, imgUrl: secondUser?.pfp_url },
    { username: thirdUser?.username, imgUrl: thirdUser?.pfp_url },
  ];
  return {
    image: (
      <div tw="w-full h-full flex flex-col bg-[#0042F5] text-white justify-between items-center p-[20px]">
        <div tw="flex flex-col bg-[#0042F5] text-white items-center p-[20px]">
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
          {nominatedUsers.map((user, index) => (
            <div
              key={index}
              tw="flex px-[60px] mb-[50px] w-auto text-white items-start justify-start"
            >
              <img
                src={user.imgUrl}
                tw="w-[100px] h-[100px] rounded-full mr-[20px] object-cover"
              />
              <p
                tw="font-bold text-[64px]"
                style={{ fontFamily: "Bricolage-Bold" }}
              >
                {user.username}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" key="1" target="/">
        Nominate Builders
      </Button>,
    ],
    imageOptions: {
      aspectRatio: "1:1",
    },
  };
});

export const GET = handler;
export const POST = handler;
