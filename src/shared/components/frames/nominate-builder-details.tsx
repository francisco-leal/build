import { appURL } from "@/shared/frames/utils";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatNumber } from "@/shared/utils/format-number";

type INominateDetailsProps = {
  farcasterPfp: string | undefined;
  farcasterUsername: string | null;
  nominatedImage: string | undefined;
  nominatedUsername: string;
  nominatedWallet: string;
  dailyBudget: number | undefined;
  pointsGiven: number | undefined;
  pointsEarned: number | undefined;
  todayNominations: number | undefined;
};

export const NominateBuilderDetails = ({
  farcasterPfp,
  farcasterUsername,
  nominatedImage,
  nominatedUsername,
  nominatedWallet,
  dailyBudget,
  pointsGiven,
  pointsEarned,
  todayNominations,
}: INominateDetailsProps) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5]">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
        {farcasterPfp && farcasterUsername ? (
          <div tw="flex items-center h-[80px]">
            <img
              src={farcasterPfp}
              tw="w-[70px] h-[70px] rounded-full mr-[20px]"
              style={{ objectFit: "cover" }}
            />
            <p
              tw="text-[52px] text-white"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              {farcasterUsername}
            </p>
          </div>
        ) : null}
        <div tw="flex flex-col items-center justify-center">
          <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px] my-0 py-0">
            <p
              tw="text-[42px] my-0 py-0"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Confirm nomination
            </p>
          </div>
          <div tw={`flex flex-col gap-[27px] w-[915px] mt-[20px] text-white`}>
            <div tw="flex flex-row px-[40px]">
              <img
                src={nominatedImage}
                width={160}
                height={160}
                tw="rounded-full mr-[30px]"
                style={{ objectFit: "cover" }}
              />
              <div tw="flex flex-col gap-1 justify-center">
                <p
                  tw="text-[78px] my-0"
                  style={{ fontFamily: "Bricolage-Bold" }}
                >
                  {nominatedUsername}
                </p>
                <p tw={`text-[32px] my-0`}>
                  {abbreviateWalletAddress(nominatedWallet)}
                </p>
              </div>
            </div>
            <div tw="mt-[20px] px-[40px] flex flex-col gap-0 w-full text-white">
              <div tw="flex justify-between w-full border-t-[3px] border-white">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  My Daily Budget
                </p>
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  {formatNumber(dailyBudget || 0)}
                </p>
              </div>
              <div tw="flex justify-between w-full">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  BUILD Points Sent
                </p>
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  {formatNumber(pointsGiven || 0)}
                </p>
              </div>
              <div tw="flex justify-between w-full">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  BUILD Points Earned
                </p>
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  {formatNumber(pointsEarned || 0)}
                </p>
              </div>
              <div tw="flex justify-between w-full border-t-[3px] border-white">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  Daily Nominations
                </p>
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  {`${todayNominations}/3`}
                </p>
              </div>
            </div>
          </div>
          {todayNominations && todayNominations >= 3 ? (
            <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
              <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                You&apos;re out of nominations for today
              </p>
            </div>
          ) : null}

          <div tw="flex w-full text-center items-center h-[70px]">
            <svg
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.8 7.6L3.8 30.4H0L9.9662e-07 7.6H3.8Z"
                fill="#FBFCFE"
              />
              <path
                d="M15.2 7.6L15.2 30.4H11.4L11.4 7.6H15.2Z"
                fill="#FBFCFE"
              />
              <path d="M26.6 11.4V17.1H22.8V11.4H26.6Z" fill="#FBFCFE" />
              <path d="M26.6 20.9V26.6H22.8V20.9H26.6Z" fill="#FBFCFE" />
              <path d="M22.8 7.6V11.4H15.2V7.6H22.8Z" fill="#FBFCFE" />
              <path d="M22.8 17.1V20.9H15.2V17.1H22.8Z" fill="#FBFCFE" />
              <path d="M22.8 26.6V30.4H15.2L15.2 26.6H22.8Z" fill="#FBFCFE" />
              <path d="M7.6 3.8V7.6L3.8 7.6V3.8H7.6Z" fill="#FBFCFE" />
              <path d="M34.2 3.8V7.6L30.4 7.6V3.8H34.2Z" fill="#FBFCFE" />
              <path d="M7.6 30.4V34.2H3.8L3.8 30.4H7.6Z" fill="#FBFCFE" />
              <path d="M34.2 30.4V34.2H30.4V30.4H34.2Z" fill="#FBFCFE" />
              <path d="M30.4 34.2V38H7.6V34.2H30.4Z" fill="#FBFCFE" />
              <path
                d="M30.4 9.9662e-07V3.8H7.6V0L30.4 9.9662e-07Z"
                fill="#FBFCFE"
              />
              <path d="M38 7.6V30.4H34.2V7.6L38 7.6Z" fill="#FBFCFE" />
            </svg>
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
  );
};
