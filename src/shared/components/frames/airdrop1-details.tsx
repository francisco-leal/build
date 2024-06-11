import { FarcasterAPIUser } from "@/app/_api/external/farcaster";
import { appURL } from "@/shared/frames/utils";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";

interface Airdrop1DetailsProps {
  currentFarcasterUser: FarcasterAPIUser;
  buildCommitted: number;
  rank: number;
  topNominators: (FarcasterAPIUser | null)[];
}
const Airdrop1Details = ({
  currentFarcasterUser,
  buildCommitted,
  rank,
  topNominators,
}: Airdrop1DetailsProps) => {
  return (
    <div tw="relative w-full h-full flex bg-[#0042F5] text-white">
      <img src={`${appURL()}/images/frame-bg.png`} tw="w-full" />
      <div tw="absolute top-0 left-0 w-full h-full flex flex-col justify-start p-[20px]">
        <div tw="flex w-auto text-white items-center">
          <img
            src={currentFarcasterUser.pfp_url}
            tw="w-[72px] h-[72px] rounded-full mr-[20px]"
            style={{ objectFit: "cover" }}
          />
          <p tw="text-[56px]" style={{ fontFamily: "Bricolage-Bold" }}>
            {currentFarcasterUser.username}
          </p>
        </div>
        <div tw="flex px-[20px] items-center justify-between bg-white w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
          <div tw="flex items-center">
            <svg
              width="58"
              height="53"
              viewBox="0 0 58 53"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M33.5696 6.69003H39.6696V9.73003H42.7096V12.79H45.7696V18.89H48.8096V34.11H45.7696V40.21H42.7096V43.27H39.6696V46.31H33.5696V49.35H18.3296V52.41H39.6696V49.35H45.7696V46.31H48.8096V43.27H51.8696V40.21H54.9096V34.11H57.9496V18.89H54.9096V12.79H51.8696V9.73003H48.8096V6.69003H45.7696V3.65003H39.6696V0.590027H18.3296V3.65003H33.5696V6.69003Z"
                fill="#0142F5"
              />
              <path d="M45.77 18.89H42.71V34.11H45.77V18.89Z" fill="#0142F5" />
              <path
                d="M42.7099 34.11H39.6699V37.17H42.7099V34.11Z"
                fill="#0142F5"
              />
              <path
                d="M42.7099 15.83H39.6699V18.89H42.7099V15.83Z"
                fill="#0142F5"
              />
              <path
                d="M39.6699 37.17H36.6299V40.21H39.6699V37.17Z"
                fill="#0142F5"
              />
              <path
                d="M39.6699 12.79H36.6299V15.83H39.6699V12.79Z"
                fill="#0142F5"
              />
              <path
                d="M36.6298 40.21H33.5698V43.27H36.6298V40.21Z"
                fill="#0142F5"
              />
              <path
                d="M36.6298 9.73004H33.5698V12.79H36.6298V9.73004Z"
                fill="#0142F5"
              />
              <path
                d="M33.5696 43.27H18.3296V46.31H33.5696V43.27Z"
                fill="#0142F5"
              />
              <path
                d="M33.5698 28.03H30.5298V34.11H33.5698V28.03Z"
                fill="#0142F5"
              />
              <path
                d="M33.5698 18.89H30.5298V21.93H33.5698V18.89Z"
                fill="#0142F5"
              />
              <path
                d="M33.5696 6.69H18.3296V9.73H33.5696V6.69Z"
                fill="#0142F5"
              />
              <path
                d="M24.4296 37.17V40.21H27.4696V37.17H30.5296V34.11H27.4696V28.03H30.5296V24.97H27.4696V18.89H30.5296V15.83H27.4696V12.79H24.4296V15.83H21.3896V18.89H24.4296V24.97H21.3896V28.03H24.4296V34.11H21.3896V37.17H24.4296Z"
                fill="#0142F5"
              />
              <path
                d="M21.3896 31.07H18.3296V34.11H21.3896V31.07Z"
                fill="#0142F5"
              />
              <path
                d="M21.3896 18.89H18.3296V24.97H21.3896V18.89Z"
                fill="#0142F5"
              />
              <path
                d="M18.33 46.3101H12.25V49.3501H18.33V46.3101Z"
                fill="#0142F5"
              />
              <path d="M18.33 40.21H15.29V43.27H18.33V40.21Z" fill="#0142F5" />
              <path
                d="M18.33 9.73004H15.29V12.79H18.33V9.73004Z"
                fill="#0142F5"
              />
              <path
                d="M18.33 3.65002H12.25V6.69002H18.33V3.65002Z"
                fill="#0142F5"
              />
              <path d="M15.29 37.17H12.25V40.21H15.29V37.17Z" fill="#0142F5" />
              <path d="M15.29 12.79H12.25V15.83H15.29V12.79Z" fill="#0142F5" />
              <path
                d="M12.2499 43.27H9.18994V46.31H12.2499V43.27Z"
                fill="#0142F5"
              />
              <path
                d="M12.2499 34.11H9.18994V37.17H12.2499V34.11Z"
                fill="#0142F5"
              />
              <path
                d="M12.2499 15.83H9.18994V18.89H12.2499V15.83Z"
                fill="#0142F5"
              />
              <path
                d="M12.2499 6.69H9.18994V9.73H12.2499V6.69Z"
                fill="#0142F5"
              />
              <path
                d="M9.1899 40.21H6.1499V43.27H9.1899V40.21Z"
                fill="#0142F5"
              />
              <path
                d="M9.1899 18.89H6.1499V34.11H9.1899V18.89Z"
                fill="#0142F5"
              />
              <path
                d="M9.1899 9.73004H6.1499V12.79H9.1899V9.73004Z"
                fill="#0142F5"
              />
              <path
                d="M6.14984 34.11H3.08984V40.21H6.14984V34.11Z"
                fill="#0142F5"
              />
              <path
                d="M6.14984 12.79H3.08984V18.89H6.14984V12.79Z"
                fill="#0142F5"
              />
              <path
                d="M3.08981 18.89H0.0498047V34.11H3.08981V18.89Z"
                fill="#0142F5"
              />
            </svg>

            <p
              tw="text-[56px] ml-[20px] text-black"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              $BUILD Committed
            </p>
          </div>
          <p
            tw="text-[56px] ml-[20px] text-[#0042F5]"
            style={{ fontFamily: "Bricolage-Bold" }}
          >
            {formatLargeNumber(buildCommitted)}
          </p>
        </div>

        <div tw="flex px-[20px] items-center justify-between mt-[20px] bg-white w-auto border-black border-t-4 border-l-4 border-b-[15px] border-r-[15px]">
          <div tw="flex items-center">
            <svg
              width="64"
              height="65"
              viewBox="0 0 64 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1808_10650)">
                <path
                  d="M57.8999 9.64001H54.8599V43.16H57.8999V9.64001Z"
                  fill="#0142F5"
                />
                <path
                  d="M54.8603 43.16H51.8003V49.26H54.8603V43.16Z"
                  fill="#0142F5"
                />
                <path
                  d="M51.8003 49.26H48.7603V52.32H51.8003V49.26Z"
                  fill="#0142F5"
                />
                <path
                  d="M54.8603 6.59998H48.7603V9.63998H54.8603V6.59998Z"
                  fill="#0142F5"
                />
                <path
                  d="M48.7602 52.32H45.7202V55.36H48.7602V52.32Z"
                  fill="#0142F5"
                />
                <path
                  d="M45.7202 55.36H42.6602V58.4H45.7202V55.36Z"
                  fill="#0142F5"
                />
                <path
                  d="M45.7202 43.16H42.6602V46.22H45.7202V43.16Z"
                  fill="#0142F5"
                />
                <path
                  d="M45.7202 15.74H42.6602V12.7H21.3402V15.74H18.2802V18.78H15.2402V43.16H18.2802V30.98H21.3402V27.94H42.6602V30.98H45.7202V43.16H48.7602V18.78H45.7202V15.74Z"
                  fill="#0142F5"
                />
                <path
                  d="M48.7602 3.56H42.6602V6.6H48.7602V3.56Z"
                  fill="#0142F5"
                />
                <path
                  d="M42.6601 46.22H39.6201V49.26H42.6601V46.22Z"
                  fill="#0142F5"
                />
                <path
                  d="M42.6601 34.02H39.6201V40.12H42.6601V34.02Z"
                  fill="#0142F5"
                />
                <path
                  d="M42.6601 58.4H36.5801V61.46H42.6601V58.4Z"
                  fill="#0142F5"
                />
                <path
                  d="M39.6199 49.26H24.3799V52.32H39.6199V49.26Z"
                  fill="#0142F5"
                />
                <path
                  d="M36.5799 61.46H27.4199V64.5H36.5799V61.46Z"
                  fill="#0142F5"
                />
                <path
                  d="M36.5799 43.16H27.4199V46.22H36.5799V43.16Z"
                  fill="#0142F5"
                />
                <path
                  d="M27.4203 58.4H21.3403V61.46H27.4203V58.4Z"
                  fill="#0142F5"
                />
                <path
                  d="M42.6603 0.5H21.3403V3.56H42.6603V0.5Z"
                  fill="#0142F5"
                />
                <path
                  d="M24.3803 46.22H21.3403V49.26H24.3803V46.22Z"
                  fill="#0142F5"
                />
                <path
                  d="M24.3803 34.02H21.3403V40.12H24.3803V34.02Z"
                  fill="#0142F5"
                />
                <path
                  d="M21.3403 55.36H18.2803V58.4H21.3403V55.36Z"
                  fill="#0142F5"
                />
                <path
                  d="M21.3403 43.16H18.2803V46.22H21.3403V43.16Z"
                  fill="#0142F5"
                />
                <path
                  d="M21.3402 3.56H15.2402V6.6H21.3402V3.56Z"
                  fill="#0142F5"
                />
                <path
                  d="M18.2802 52.32H15.2402V55.36H18.2802V52.32Z"
                  fill="#0142F5"
                />
                <path
                  d="M15.2402 49.26H12.1802V52.32H15.2402V49.26Z"
                  fill="#0142F5"
                />
                <path
                  d="M15.2401 6.59998H9.14014V9.63998H15.2401V6.59998Z"
                  fill="#0142F5"
                />
                <path
                  d="M12.1801 43.16H9.14014V49.26H12.1801V43.16Z"
                  fill="#0142F5"
                />
                <path
                  d="M9.1401 9.64001H6.1001V43.16H9.1401V9.64001Z"
                  fill="#0142F5"
                />
              </g>
              <defs>
                <clipPath id="clip0_1808_10650">
                  <rect
                    width="64"
                    height="64"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>

            <p
              tw="font-bold text-[56px] ml-[20px] text-black"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Airdrop 1 Rank
            </p>
          </div>
          <p
            tw="text-[56px] ml-[20px] text-[#0042F5]"
            style={{ fontFamily: "Bricolage-Bold" }}
          >
            {`#${rank}`}
          </p>
        </div>

        <div tw="flex flex-col w-auto text-white items-center mb-[50px] items-start gap-[20px] justify-start">
          <div tw="flex flex-col mx-auto items-center h-[200px]">
            <h1
              tw="mx-auto text-[64px] text-white"
              style={{ fontFamily: "Bricolage-Bold" }}
            >
              Top {topNominators.length > 0 ? topNominators.length : ""}{" "}
              nominators
            </h1>
          </div>
          <div tw="flex w-full justify-between mx-auto items-center">
            {topNominators.length > 0 ? (
              topNominators.map((nominator, index) => {
                if (!nominator) return null;
                return (
                  <div
                    key={`${nominator.username}.${index}`}
                    tw="flex flex-col justify-between items-center mx-auto mb-[50px] w-auto text-white"
                  >
                    <img
                      src={nominator?.pfp_url ? nominator.pfp_url : ""}
                      tw="w-[136px] h-[136px] rounded-full mr-[20px]"
                      style={{ objectFit: "cover" }}
                    />
                    <p
                      tw="font-bold text-[40px] py-[12px] px-[20px] text-[#0042F5] bg-white w-auto border-black border-t-4 border-l-4 border-b-[10px] border-r-[10px]"
                      style={{ fontFamily: "Bricolage-Bold" }}
                    >
                      {nominator?.username
                        ? nominator.username.slice(0, 14)
                        : " "}
                    </p>
                  </div>
                );
              })
            ) : (
              <div tw="flex flex-col mx-auto items-center">
                <p tw="text-[48px]" style={{ fontFamily: "Bricolage-Bold" }}>
                  No nominators found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Airdrop1Details;
