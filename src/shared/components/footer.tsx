import { Typography, Link, Stack } from '@mui/joy';
import { LogoLong } from '../icons';

export const Footer = () => {
    return (
        <Stack
            sx={{
                pt: 6,
                pb: 4,
                px: 2,
                gap: 3,
                alignItems: 'center',
                width: '100%'
            }}
        >
            <Link href="/" sx={{ '& svg': { color: 'common.white' } }}>
                <LogoLong sx={{ width: 256, height: 54 }} />
            </Link>

            <Stack
                sx={{
                    flexDirection: { md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 3,
                    width: '100%',
                    maxWidth: 'sm',
                    '& a': {
                        color: 'common.white'
                    }
                }}
            >
                <Typography sx={{ color: '#D0D2D5' }}>Buy</Typography>
                <Link href="https://warpcast.com/~/channel/boss" target="_blank" sx={{ color: 'common.white' }}>
                    Farcaster
                </Link>
                <Typography sx={{ color: '#D0D2D5' }}>Telegram</Typography>
                <Typography sx={{ color: '#D0D2D5' }}>Party.app</Typography>
                <Link
                    href="https://bosscommunity.notion.site/BOSS-FAQ-0a7dabb972e1442382f2cf0dad00ed4e?pvs=4"
                    target="_blank"
                    sx={{ color: 'common.white' }}
                >
                    FAQ
                </Link>
                <Typography sx={{ color: '#D0D2D5' }}>Meme templates</Typography>
            </Stack>

            <Typography sx={{ color: 'common.white', textAlign: 'center' }}>
                BOSS is an experimental community project. Not Financial Advice. DYOR.
            </Typography>
        </Stack>
    );
};
