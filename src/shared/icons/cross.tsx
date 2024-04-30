import { SvgIcon, SvgIconProps } from "@mui/joy";

export const Cross = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        stroke="none"
        fill="currentColor"
      >
        <path
          d="M28.5 9.615L26.385 7.5L18 15.885L9.615 7.5L7.5 9.615L15.885 18L7.5 26.385L9.615 28.5L18 20.115L26.385 28.5L28.5 26.385L20.115 18L28.5 9.615Z"
          fill="#FBFCFE"
        />
      </svg>
    </SvgIcon>
  );
};
