'use client';
import { Box, Typography, Link } from '@mui/joy';
import { LogoLong } from '../icons';

export const Footer = () => {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };
    
    return (
        <Box
            sx={{
                padding: '48px 0 32px 0',
                display: 'flex',
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
                <Link href="/">
                    <LogoLong />
                </Link>

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
    );
};
