import { SvgIcon, SvgIconProps } from "@mui/joy";

export const RedCross = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" fill="none">
        <path
          d="M12 2.5C6.47 2.5 2 6.97 2 12.5C2 18.03 6.47 22.5 12 22.5C17.53 22.5 22 18.03 22 12.5C22 6.97 17.53 2.5 12 2.5ZM17 16.09L15.59 17.5L12 13.91L8.41 17.5L7 16.09L10.59 12.5L7 8.91L8.41 7.5L12 11.09L15.59 7.5L17 8.91L13.41 12.5L17 16.09Z"
          fill="currentColor"
        />
      </svg>
    </SvgIcon>
  );
};
