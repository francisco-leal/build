import { appURL } from "@/shared/frames/utils";

export const NominateBuilderError = ({
  farcasterPfp,
  farcasterUsername,
  builderImage,
  builderUsername,
  errorTitle,
  errorMessage,
}: {
  farcasterPfp: string | undefined;
  farcasterUsername: string | null;
  builderImage: string | undefined;
  builderUsername: string | undefined;
  errorTitle: string;
  errorMessage: string | undefined;
}) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
        {farcasterPfp && farcasterUsername ? (
          <div tw="flex items-center">
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
        <div tw="flex flex-col gap-4 justify-center items-center h-[820px] mx-auto">
          <div tw="flex px-[20px] w-auto text-white mb-[50px] items-center">
            {builderImage ? (
              <img
                src={builderImage}
                tw="w-[120px] h-[120px] rounded-full mr-[20px]"
                style={{ objectFit: "cover" }}
              />
            ) : null}
            <p tw="text-[78px]" style={{ fontFamily: "Bricolage-Bold" }}>
              {builderUsername
                ? builderUsername.length > 15
                  ? `${builderUsername.slice(0, 15)}...`
                  : builderUsername
                : ""}
            </p>
          </div>
          <div tw="w-auto flex px-[20px] bg-white text-[#0042F5] border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
            <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
              {errorTitle}
            </p>
          </div>
          {errorMessage ? (
            <div tw="w-auto flex px-[20px] text-white mb-[50px] justify-center items-center">
              <p
                tw="text-[78px] text-center mx-auto"
                style={{ fontFamily: "Bricolage-Bold" }}
              >
                {errorMessage}
              </p>
            </div>
          ) : null}
        </div>
        <div tw="flex items-center h-[70px]">
          <svg
            width="38"
            height="38"
            viewBox="0 0 38 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3.8 7.6L3.8 30.4H0L9.9662e-07 7.6H3.8Z" fill="#FBFCFE" />
            <path d="M15.2 7.6L15.2 30.4H11.4L11.4 7.6H15.2Z" fill="#FBFCFE" />
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
  );
};
