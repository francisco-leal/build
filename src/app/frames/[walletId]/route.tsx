/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { getUserStats } from "@/app/_api/data/stats";
import { getWalletFromSystem } from "@/app/_api/data/wallets";
import { appURL } from "@/shared/frames/utils";
import { frames } from "../frames";

const shortWalletId = (usernameOrWallet: string | undefined) => {
  if (!usernameOrWallet) return null;
  if (usernameOrWallet.length === 42 && usernameOrWallet.startsWith("0x"))
    return usernameOrWallet.slice(0, 6) + "..." + usernameOrWallet.slice(-4);
  return usernameOrWallet;
};

const handleRequest = frames(async (ctx) => {
  const userAddress = ctx.url.pathname.split("/frames/")[1].toLowerCase() ?? "";

  const walletInfo = await getWalletFromSystem(userAddress).catch(() => null);
  const userStats = await getUserStats(userAddress).catch(() => null);
  let sharableTextUriEncoded = `This week I nominate ${shortWalletId(userAddress)} because ...\nCheck this week's nominations at rounds.wtf/build\n Nominate your favorite builder by casting in /build`;
  if (walletInfo?.username) {
    sharableTextUriEncoded = `This week I nominate @${walletInfo.username} because ...\nCheck this week's nominations at rounds.wtf/build\n Nominate your favorite builder by casting in /build`;
  }
  sharableTextUriEncoded = encodeURI(sharableTextUriEncoded);

  return {
    image: (
      <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
        <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
        <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
          <div tw="flex flex-col w-full h-full justify-center items-center">
            <div tw="flex items-center text-center px-[20px] w-auto text-white mb-[50px]">
              {walletInfo?.image && (
                <img
                  src={walletInfo?.image}
                  tw="w-[120px] h-[120px] rounded-full mr-[20px]"
                  style={{ objectFit: "cover" }}
                />
              )}
              <p
                tw="font-bold text-[78px]"
                style={{ fontFamily: "Bricolage-Bold" }}
              >
                Nominate{" "}
                {shortWalletId(walletInfo?.username || walletInfo?.wallet) ||
                  "404 builder"}
              </p>
            </div>
            <div tw="flex justify-around w-full">
              <div tw="flex w-[524px] px-[20px] bg-white border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px] mb-4 justify-between items-center">
                <p
                  tw="text-[32px] text-[#000]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Builder Score
                </p>
                <p
                  tw="text-[32px] text-[#0042F5]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {walletInfo?.builderScore || 0}
                </p>
              </div>
              <div tw="flex w-[524px] px-[20px] bg-white text-[#0042F5] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px] mb-4 justify-between items-center">
                <p
                  tw="text-[32px] text-[#000]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  Nominations Received
                </p>
                <p
                  tw="text-[32px] text-[#0042F5]"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {userStats?.nominations_received || 0}
                </p>
              </div>
            </div>

            <div tw="flex w-full text-center items-center justify-center">
              <img
                src={`${appURL()}/images/frame-icon.svg`}
                style={{ width: "38px", height: "38px" }}
              />
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
      <Button
        action="link"
        key="1"
        target={`https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&channelKey=build`}
      >
        Nominate
      </Button>,
      <Button action="link" key="2" target={`https://build.top`}>
        Visit build.top
      </Button>,
      ,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
