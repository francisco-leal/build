import { SvgIcon, SvgIconProps } from '@mui/joy';

export const Hamburger = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" stroke="none" fill="currentColor">
                <path d="M13.5 27H31.5V24H13.5V27ZM4.5 9V12H31.5V9H4.5ZM13.5 19.5H31.5V16.5H13.5V19.5Z" />
            </svg>
        </SvgIcon>
    );
};
