'use client';

import { useAccount } from 'wagmi';
import { Box, Button } from '@mui/joy';
import { NoSsr } from '@mui/base';

export const ConnectWalletButton = ({ hideIfConnected }: { hideIfConnected?: boolean }) => {
    // Wallet
    const { address } = useAccount();

    if (hideIfConnected && address) return null;

    return (
        <NoSsr fallback={<Button disabled>Connect Wallet</Button>}>
            <Box
                sx={{
                    '& > w3m-button': {
                        height: 40,
                        '--wui-color-accent-100': t => t.vars.palette.neutral.solidBg,
                        '--wui-color-inverse-100': t => t.vars.palette.neutral.solidColor,
                        '--wui-color-accent-090': t => t.vars.palette.neutral.solidHoverBg
                    }
                }}
            >
                <w3m-button />
            </Box>
        </NoSsr>
    );
};
