import { appURL } from "@/shared/frames/utils";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatLargeNumber } from "@/shared/utils/format-number";

type INominateProps = {
  farcasterPfp: string | undefined;
  farcasterUsername: string | null;
  nominatedImage: string | undefined;
  nominatedUsername: string;
  nominatedWallet: string;
  nominatedBio: string;
  nominatedBuilderScore: number;
  nominatedUserNominationsReceived: number;
  nominatedBuildPoints: number;
  todayNominations: number | undefined;
};

export const NominateBuilder = ({
  farcasterPfp,
  farcasterUsername,
  nominatedImage,
  nominatedUsername,
  nominatedWallet,
  nominatedBio,
  nominatedBuilderScore,
  nominatedUserNominationsReceived,
  nominatedBuildPoints,
  todayNominations,
}: INominateProps) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5]">
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
        <div tw="flex flex-col items-center justify-center h-full">
          <div tw="flex px-[20px] bg-white text-[#0042F5] w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px] my-0 py-0">
            <p
              tw="text-[42px] my-0 py-0"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Confirm nomination
            </p>
          </div>
          <div
            tw={`flex flex-col gap-[27px] mx-auto mt-[20px] w-[825px] pt-[50px] text-[#0042F5] bg-white border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]`}
          >
            <div tw="flex flex-row px-[40px]">
              <img
                src={nominatedImage}
                width={210}
                height={210}
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
                <p tw={`text-[25px] my-0 text-[#636B74]`}>
                  {abbreviateWalletAddress(nominatedWallet)}
                </p>
              </div>
            </div>
            <div tw="flex flex-col h-fit">
              <div
                tw="flex w-[810px] px-[40px] min-h-[200px]"
                style={{ overflow: "hidden" }}
              >
                <p tw="text-[28px] text-[#636B74]">{nominatedBio}</p>
              </div>
              <div tw="flex bg-[#0042F5] text-white w-auto h-[320px] border-black border-t-4 py-0 my-0">
                <div tw="flex flex-col text-center items-center justify-center my-0 px-[30px] py-[70px] w-[270px]">
                  <svg
                    width="44"
                    height="45"
                    viewBox="0 0 44 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1241_4271)">
                      <path
                        d="M39.8048 6.7832H37.7148V29.8282H39.8048V6.7832Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M37.717 29.8281H35.6133V34.0219H37.717V29.8281Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M35.6134 34.0234H33.5234V36.1272H35.6134V34.0234Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M37.7172 4.69336H33.5234V6.78336H37.7172V4.69336Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M33.5236 36.127H31.4336V38.217H33.5236V36.127Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M31.4319 38.2168H29.3281V40.3068H31.4319V38.2168Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M31.4319 29.8281H29.3281V31.9319H31.4319V29.8281Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M31.4316 10.9767H29.3278V8.88672H14.6703V10.9767H12.5666V13.0667H10.4766V29.828H12.5666V21.4542H14.6703V19.3642H29.3278V21.4542H31.4316V29.828H33.5216V13.0667H31.4316V10.9767Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M33.5219 2.60352H29.3281V4.69352H33.5219V2.60352Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M29.3283 31.9336H27.2383V34.0236H29.3283V31.9336Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M29.3283 23.5449H27.2383V27.7387H29.3283V23.5449Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M29.3284 40.3066H25.1484V42.4104H29.3284V40.3066Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M27.2392 34.0234H16.7617V36.1272H27.2392V34.0234Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M25.1491 42.4102H18.8516V44.5002H25.1491V42.4102Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M25.1491 29.8281H18.8516V31.9319H25.1491V29.8281Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M18.8519 40.3066H14.6719V42.4104H18.8519V40.3066Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M29.3294 0.5H14.6719V2.60375H29.3294V0.5Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M16.7619 31.9336H14.6719V34.0236H16.7619V31.9336Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M16.7619 23.5449H14.6719V27.7387H16.7619V23.5449Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M14.6702 38.2168H12.5664V40.3068H14.6702V38.2168Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M14.6702 29.8281H12.5664V31.9319H14.6702V29.8281Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M14.6703 2.60352H10.4766V4.69352H14.6703V2.60352Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M12.5666 36.127H10.4766V38.217H12.5666V36.127Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M10.4787 34.0234H8.375V36.1272H10.4787V34.0234Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M10.4789 4.69336H6.28516V6.78336H10.4789V4.69336Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M8.37516 29.8281H6.28516V34.0219H8.37516V29.8281Z"
                        fill="#FBFCFE"
                      />
                      <path
                        d="M6.28531 6.7832H4.19531V29.8282H6.28531V6.7832Z"
                        fill="#FBFCFE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1241_4271">
                        <rect
                          width="44"
                          height="44"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p
                    tw="text-[22px] h-[50px]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    BUILDER SCORE
                  </p>
                  <p
                    tw="text-[64px] text-[#51D7D0]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    {nominatedBuilderScore}
                  </p>
                </div>
                <div tw="flex flex-col text-center items-center justify-center my-0 px-[30px] py-[70px] w-[270px] border-black border-r-4 border-l-4">
                  <svg
                    width="44"
                    height="45"
                    viewBox="0 0 44 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1241_4303)">
                      <g clip-path="url(#clip1_1241_4303)">
                        <path
                          d="M42.9455 29.8594H40.8555V40.3369H42.9455V29.8594Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M40.8577 40.3379H38.7539V42.4416H40.8577V40.3379Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M40.8577 27.7695H38.7539V29.8595H40.8577V27.7695Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M40.8577 8.9043H38.7539V15.2018H40.8577V8.9043Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M38.7541 42.4414H36.6641V44.5314H38.7541V42.4414Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M38.7541 25.666H36.6641V27.7698H38.7541V25.666Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M28.2873 23.5769V15.2031H26.1836V25.6669H36.6611V23.5769H28.2873Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M38.7564 15.2031H32.4727V17.2931H38.7564V15.2031Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M38.7564 6.81445H32.4727V8.90445H38.7564V6.81445Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M34.5764 27.7695H32.4727V34.0533H34.5764V27.7695Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M32.4689 8.9043H30.3789V15.2018H32.4689V8.9043Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M30.3791 0.53125H28.2891V2.62125H30.3791V0.53125Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M28.2873 27.7695H26.1836V34.0533H28.2873V27.7695Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M28.2873 2.62305H26.1836V4.7268H28.2873V2.62305Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M26.1859 13.0996H21.9922V15.2034H26.1859V13.0996Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M21.9923 40.3379H19.9023V44.5316H21.9923V40.3379Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M19.9008 25.6669H15.707V27.7706H19.9008V31.9644H21.9908V15.2031H19.9008V25.6669Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M21.9923 0.53125H19.9023V4.725H21.9923V0.53125Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M19.9025 38.248H17.8125V40.338H19.9025V38.248Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M17.8108 36.1426H15.707V38.2463H17.8108V36.1426Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M17.8108 8.90445H15.707V15.202H17.8108V13.0982H19.9008V11.0082H26.1845V8.90445H24.0945V6.81445H17.8108V8.90445Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M15.7072 27.7695H13.6172V36.1433H15.7072V27.7695Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M15.7072 2.62305H13.6172V4.7268H15.7072V2.62305Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M13.6173 0.53125H11.5273V2.62125H13.6173V0.53125Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M11.5295 25.666H9.42578V31.9635H11.5295V25.666Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M11.5295 8.9043H9.42578V15.2018H11.5295V8.9043Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M9.42437 31.9629H3.14062V34.0529H9.42437V31.9629Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M9.42437 23.5762H3.14062V25.6662H9.42437V23.5762Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M9.42437 15.2031H3.14062V17.2931H9.42437V15.2031Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M9.42437 6.81445H3.14062V8.90445H9.42437V6.81445Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M3.14078 25.666H1.05078V31.9635H3.14078V25.666Z"
                          fill="#FBFCFE"
                        />
                        <path
                          d="M3.14078 8.9043H1.05078V15.2018H3.14078V8.9043Z"
                          fill="#FBFCFE"
                        />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_1241_4303">
                        <rect
                          width="44"
                          height="44"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                      <clipPath id="clip1_1241_4303">
                        <rect
                          width="44"
                          height="44"
                          fill="white"
                          transform="translate(0 0.533203)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <p
                    tw="text-[22px] h-[50px]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    NOMINATIONS RECEIVED
                  </p>
                  <p
                    tw="text-[64px] text-[#51D7D0]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    {nominatedUserNominationsReceived}
                  </p>
                </div>
                <div tw="flex flex-col text-center items-center justify-center my-0 px-[30px] py-[70px] w-[270px]">
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
                    <path
                      d="M22.8 26.6V30.4H15.2L15.2 26.6H22.8Z"
                      fill="#FBFCFE"
                    />
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
                    tw="text-[22px] h-[50px]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    BUILD POINTS
                  </p>
                  <p
                    tw="text-[64px] text-[#51D7D0]"
                    style={{ fontFamily: "Bricolage-Bold" }}
                  >
                    {formatLargeNumber(nominatedBuildPoints)}
                  </p>
                </div>
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

          <div tw="flex w-full text-center items-center h-[70px] mt-[15px]">
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
