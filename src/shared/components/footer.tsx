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
                alignItems: 'center'
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
                    gap: 3
                }}
            >
                <Link href="#" disabled={true} sx={{ color: 'common.white' }}>
                    Buy
                </Link>
                <Link href="https://warpcast.com/~/channel/boss" target="_blank" sx={{ color: 'common.white' }}>
                    Farcaster
                </Link>
                <Link href="#" sx={{ color: 'common.white' }} disabled={true}>
                    Telegram
                </Link>
                <Link href="#" sx={{ color: 'common.white' }} disabled={true}>
                    Party.app
                </Link>
                <Link
                    href="https://bosscommunity.notion.site/BOSS-FAQ-0a7dabb972e1442382f2cf0dad00ed4e?pvs=4"
                    target="_blank"
                    sx={{ color: 'common.white' }}
                >
                    FAQ
                </Link>
                <Link href="#" sx={{ color: 'common.white' }} disabled={true}>
                    Meme templates
                </Link>
            </Stack>

            <Typography sx={{ color: 'common.white', textAlign: 'center' }}>
                BOSS is an experimental community project. Not Financial Advice. DYOR.
            </Typography>
        </Stack>
    );
};
