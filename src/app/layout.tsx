import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { CssVarsProvider } from '@mui/joy/styles';
import { cookieToInitialState } from 'wagmi';

import { config } from './config';
import Web3ModalProvider from './context';
import { theme } from './theme';
import { Box } from '@mui/joy';

export const metadata: Metadata = {
    title: '$BOSS',
    description: '$boss'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialState = cookieToInitialState(config, headers().get('cookie'));
    return (
        <html lang="en">
            <CssVarsProvider theme={theme}>
                <Box component="body" sx={{ backgroundColor: 'primary.500', m: 0, p: 0 }}>
                    <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
                </Box>
            </CssVarsProvider>
        </html>
    );
}
