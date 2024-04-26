import { Box, Button, Link, Stack, Typography } from '@mui/joy';

export const Section1 = () => {
    return (
        <Stack
            component="section"
            sx={{
                maxWidth: { md: 'sm' },
                py: 10,
                gap: 4
            }}
        >
            <Typography
                sx={{
                    color: 'common.white',
                    fontSize: { xs: '32px', md: '56px' },
                    textAlign: 'center',
                    fontWeight: 'bold',
                    lineHeight: '1'
                }}
            >
                The Builder <br /> Memecoin on Base
            </Typography>

            <Typography sx={{ color: 'common.white', fontSize: '18px', textAlign: 'center', fontWeight: '600' }}>
                $BOSS is an ERC-20 token on Base with a total supply of a 404,404,404,404. It launched on May 2024, with
                a 7-day crowdfund on party.app, followed by a Community Airdrop to onchain builders.
            </Typography>
        </Stack>
    );
};
