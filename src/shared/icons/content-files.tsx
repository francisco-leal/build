import { IconProps } from './type';

export const ContentFiles = ({ color, size }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size || 48} height={size || 48} viewBox="0 0 48 48" fill="none">
            <g clipPath="url(#clip_content_files)">
                <path
                    d="M43.44 20.58V13.71H41.145V16.005H36.585V11.43H38.865V9.15H34.29V4.575H32.01V0H6.87V2.28H2.295V20.58H0V48H48V20.58H43.44ZM34.29 11.43V18.285H41.145V20.58H22.86V11.43H34.29ZM4.575 4.575H6.87V20.58H4.575V4.575ZM13.725 27.435H11.43V29.715H6.87V27.435H4.575V25.14H13.725V27.435ZM13.725 20.58H9.15V2.28H29.715V4.575H13.725V20.58ZM16.005 6.855H32.01V9.15H20.58V20.58H16.005V6.855ZM45.72 45.72H18.3V22.86H45.72V45.72Z"
                    fill={color || '#FBFCFE'}
                />
                <path d="M43.44 34.29H41.145V36.57H43.44V34.29Z" fill={color || '#FBFCFE'} />
                <path d="M43.4401 41.145H29.7151V43.425H43.4401V41.145Z" fill={color || '#FBFCFE'} />
                <path d="M41.145 11.4301H38.865V13.7101H41.145V11.4301Z" fill={color || '#FBFCFE'} />
                <path d="M38.865 36.5699H34.29V38.8649H38.865V36.5699Z" fill={color || '#FBFCFE'} />
                <path d="M32.0101 34.29H29.7151V36.57H32.0101V34.29Z" fill={color || '#FBFCFE'} />
            </g>
            <defs>
                <clipPath id="clip_content_files">
                    <rect width={size || 48} height={size || 48} fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};
