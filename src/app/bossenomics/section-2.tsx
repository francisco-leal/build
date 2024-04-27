import { Sheet, Stack, Typography, Box } from '@mui/joy';
import DESKTOP_GRAPH from "../../../public/images/bossenomics-graph.png"
import MOBILE_GRAPH from "../../../public/images/bossenomics-graph-mobile.png"
import Image from 'next/image';

export const Section2 = () => {
    return (
        <Stack
            component="section"
            sx={{
                mx: "auto",
                maxWidth: { xs: 'sm', md: 'lg' },
                px: { xs: 2, sm: 8 },
                py: 5,
                gap: 5
            }}
        >
            <Stack
                sx={{

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
                variant='outlined'
                sx={{ width: "100%" }}
            >
                <Stack sx={{ py: { xs: 5, md: 5 }, px: { xs: 5, md: 20 } }}>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Image src={DESKTOP_GRAPH} alt="graph" style={{ width: '100%', height: 'auto' }} />
                    </Box>

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Image src={MOBILE_GRAPH} alt="graph" style={{ width: '100%', height: 'auto' }} />
                    </Box>
                </Stack>
            </Sheet>
        </Stack>
    );
};
