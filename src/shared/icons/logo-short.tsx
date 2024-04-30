import { SvgIcon, SvgIconProps } from "@mui/joy";

export const LogoShort = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 40"
        stroke="none"
        fill="currentColor"
      >
        <path d="M19.95 25.9C23.1809 25.9 25.8 23.2809 25.8 20.05C25.8 16.8191 23.1809 14.2 19.95 14.2C16.7191 14.2 14.1 16.8191 14.1 20.05C14.1 23.2809 16.7191 25.9 19.95 25.9Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36 20C36 28.8366 28.8366 36 20 36C11.1634 36 4 28.8366 4 20C4 11.1634 11.1634 4 20 4C28.8366 4 36 11.1634 36 20ZM33.6 20.05C33.6 20.05 27.5111 29.1 20 29.1C12.4889 29.1 6.4 20.05 6.4 20.05C6.4 20.05 12.4889 11 20 11C27.5111 11 33.6 20.05 33.6 20.05Z"
        />
      </svg>
    </SvgIcon>
  );
};
