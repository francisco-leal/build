import { appURL } from "@/shared/frames/utils";

export const SearchBuilders = ({
  farcasterPfp = undefined,
  farcasterUsername = null,
}: {
  farcasterPfp?: string | undefined;
  farcasterUsername?: string | null;
}) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col p-[20px]">
        <div tw="flex flex-col gap-4 justify-center items-center h-full mx-auto">
          {farcasterPfp && farcasterUsername ? (
            <div tw="flex px-[20px] w-auto text-white">
              <img
                src={farcasterPfp}
                tw="w-[120px] h-[120px] rounded-full mr-[20px]"
                style={{ objectFit: "cover" }}
              />
              <p tw="text-[60px]" style={{ fontFamily: "Bricolage-Bold" }}>
                {farcasterUsername}
              </p>
            </div>
          ) : null}
          <div tw="flex px-[20px] bg-white text-[#0042F5] w-[600px] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
            <p
              tw="text-[48px] mx-auto"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Search for builders
            </p>
          </div>
          <div tw="flex w-full text-center items-center">
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
