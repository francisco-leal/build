import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { CssVarsProvider } from '@mui/joy/styles';
import { cookieToInitialState } from 'wagmi';

import { config } from './config';
import Web3ModalProvider from './context';
import { theme } from './theme';

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
                <body style={{ backgroundColor: '#0142F5', margin: '0', padding: '0' }}>
                    <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
                </body>
            </CssVarsProvider>
        </html>
    );
}
