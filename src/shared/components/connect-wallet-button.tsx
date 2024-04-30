'use client';

import { useAccount } from 'wagmi';
import { Stack, Button, StackProps } from '@mui/joy';
import { NoSsr } from '@mui/base';

export type ConnectWalletButtonProps = StackProps & {
    hideIfConnected?: boolean;
};

export const ConnectWalletButton = ({ hideIfConnected, ...props }: ConnectWalletButtonProps) => {
    // Wallet
    const { address } = useAccount();

    if (hideIfConnected && address) return null;

    return (
        <NoSsr fallback={<Button disabled>Connect&nbsp;Wallet</Button>}>
            <Stack
                {...props}
                sx={{
                    '& > w3m-button': {
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        // colors for the button before loggin
                        '--wui-color-accent-100': t => t.vars.palette.neutral.solidBg,
                        '--wui-color-inverse-100': t => t.vars.palette.neutral.solidColor,
                        '--wui-color-accent-090': t => t.vars.palette.neutral.solidHoverBg,

                        // colors for the button after login
                        '--wui-color-fg-100': t => t.vars.palette.common.white,
                        '--wui-color-fg-175': t => t.vars.palette.common.white,
                        '--wui-color-fg-200': t => t.vars.palette.common.white,
                        '--wui-gray-glass-002': t => t.vars.palette.primary[500],
                        '--wui-gray-glass-005': t => t.vars.palette.primary[500],
                        '&:hover': {
                            '--wui-gray-glass-005': t => t.vars.palette.primary.outlinedHoverBg
                        }
                    },
                    flexDirection: 'row',
                    ...props.sx
                }}
            >
                <w3m-button />
            </Stack>
        </NoSsr>
    );
};
