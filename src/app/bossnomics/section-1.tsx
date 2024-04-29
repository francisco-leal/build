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
                    fontSize: { xs: '32px', md: '48px' },
                    textAlign: 'center',
                    fontWeight: '700',
                    lineHeight: '115%'
                }}
            >
                The Memecoin for Builders
            </Typography>

            <Typography
                sx={{
                    color: 'common.white',
                    fontSize: '18px',
                    textAlign: 'center',
                    fontWeight: '600',
                    lineHeight: '166%'
                }}
            >
                $BOSS is an ERC-20 token on Base with a total supply of a 404,404,404,404. It launched on May 2024, with
                a 7-day crowdfund on party.app, followed by a Community Airdrop to onchain builders.
            </Typography>
        </Stack>
    );
};
