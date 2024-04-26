'use client';
import { NavBar } from '@/shared/components/nav-bar';
import { Typography, Button, Box, Link, Table, Stack } from '@mui/joy';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';
import { Section4 } from './section-4';

export default function Home() {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };

    return (
        <>
            <NavBar />

            <Stack>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </Stack>

            {/* FOOTER */}
            <Box
                sx={{
                    // Temporary, hide section in mobile
                    display: 'none',
                    padding: '48px 0 32px 0',

                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '1224px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <Typography sx={{ color: colors.white, fontSize: '51px' }}>BOSS</Typography>

                    <Box sx={{ display: 'flex', gap: '24px' }}>
                        <Link sx={{ color: colors.white }}>Buy</Link>
                        <Link sx={{ color: colors.white }}>Farcaster</Link>
                        <Link sx={{ color: colors.white }}>Telegram</Link>
                        <Link sx={{ color: colors.white }}>Party.app</Link>
                        <Link sx={{ color: colors.white }}>FAQ</Link>
                        <Link sx={{ color: colors.white }}>Meme templates</Link>
                    </Box>

                    <Typography sx={{ color: colors.white }}>
                        BOSS is an experimental community project, not directly owned by{' '}
                        <Link sx={{ color: colors.white, textDecoration: 'underline' }}>Talent Protocol</Link>. Not
                        Financial Advice. DYOR.
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
