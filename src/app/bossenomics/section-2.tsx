import { Sheet, Stack, Typography, Box } from '@mui/joy';

export const Section2 = () => {
    return (
        <Stack
            component="section"
            sx={{
                py: 5,
                px: { xs: 2, md: 0 },
                gap: 5
            }}
        >
            <Stack
                sx={{
                    maxWidth: { xs: 'sm', md: 'md' },
                    gap: 2
                }}
            >
                <Typography
                    sx={{
                        color: 'common.white',
                        fontSize: { xs: '30px', md: '40px' },
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}
                >
                    Tokenomics
                </Typography>

                <Typography
                    sx={{
                        color: 'common.white',
                        fontSize: '18px',
                        textAlign: 'center',
                        fontWeight: '600'
                    }}
                >
                    60% of tokens are intended for the community and ecosystem. The other 40% are related with the
                    initial liquidity pool on Uniswap and liquidity mining rewards.
                </Typography>

                <Typography sx={{ color: 'common.white', fontSize: '18px', textAlign: 'center' }}>
                    0xf4ec...eEc64F
                </Typography>
            </Stack>

            <Sheet
                variant="outlined"
                sx={{
                    maxWidth: { xs: 'md', md: 'lg' }
                }}
            >
                <Box>
                    <img src="/public/images/bossenomics-graph.png" alt="graph" />
                </Box>
            </Sheet>
        </Stack>
    );
};
