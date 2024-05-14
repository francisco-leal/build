import { SvgIcon, SvgIconProps } from "@mui/joy";

export const LogoShort = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        viewBox="0 0 400 400"
        stroke="none"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M40 320L40 80H0L1.04907e-05 320H40Z" />
        <path d="M160 320L160 80H120L120 320H160Z" />
        <path d="M280 280V220L240 220V280L280 280Z" />
        <path d="M280 180V120H240V180H280Z" />
        <path d="M240 320V280H160V320H240Z" />
        <path d="M240 220V180H160V220H240Z" />
        <path d="M240 120V80H160L160 120H240Z" />
        <path d="M80 360L80 320H40V360H80Z" />
        <path d="M360 360V320H320V360H360Z" />
        <path d="M80 80L80 40H40L40 80L80 80Z" />
        <path d="M360 80V40H320V80H360Z" />
        <path d="M320 40V0L80 1.04907e-05V40H320Z" />
        <path d="M320 400V360H80V400H320Z" />
        <path d="M400 320V80L360 80V320H400Z" />
      </svg>
    </SvgIcon>
  );
};
