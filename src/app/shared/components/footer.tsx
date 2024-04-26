import { Typography, Link, Stack } from '@mui/joy';

export const Footer = () => {
    return (
        <Stack
            sx={{
                pt: 6,
                pb: 4,
                px: 0,
                gap: 3
            }}
        >
            <Typography level="h1" sx={{ color: 'common.white', fontSize: '51px', textAlign: 'center' }}>
                BOSS
            </Typography>

            <Stack
                sx={{
                    flexDirection: { md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                <Link href="#" sx={{ color: 'common.white' }}>
                    Buy
                </Link>
                <Link href="#" sx={{ color: 'common.white' }}>
                    Farcaster
                </Link>
                <Link href="#" sx={{ color: 'common.white' }}>
                    Telegram
                </Link>
                <Link href="#" sx={{ color: 'common.white' }}>
                    Party.app
                </Link>
                <Link href="#" sx={{ color: 'common.white' }}>
                    FAQ
                </Link>
                <Link href="#" sx={{ color: 'common.white' }}>
                    Meme templates
                </Link>
            </Stack>

            <Typography sx={{ color: 'common.white', textAlign: 'center' }}>
                BOSS is an experimental community project, not directly owned by{' '}
                <Link href="#" sx={{ color: 'common.white', textDecoration: 'underline' }}>
                    Talent Protocol
                </Link>
                . Not Financial Advice. DYOR.
            </Typography>
        </Stack>
    );
};
