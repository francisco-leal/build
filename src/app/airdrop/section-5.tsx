import { Sheet, Stack, Typography, Button } from '@mui/joy';

export const Section5 = () => {
    return (
        <Stack
            component="section"
            sx={{
                maxWidth: { xs: 'md', md: 'lg' },
                flexDirection: { xs: 'column', md: 'row' },
                px: { xs: 2, sm: 8 },
                pt: { xs: 6, sm: 5 },
                pb: 2,
                mx: 'auto',
                gap: 5
            }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    minHeight: 250,
                    gap: 5
                }}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Typography
                        textColor="primary.500"
                        sx={{
                            fontSize: '18px'
                        }}
                    >
                        BOSS Points
                    </Typography>
                    <Typography
                        textColor="common.black"
                        sx={{
                            fontSize: '36px',
                            fontWeight: 'bold'
                        }}
                    >
                        11.450
                    </Typography>
                    <Typography
                        textColor="neutral.500"
                        sx={{
                            fontSize: '18px',
                            textAlign: 'center'
                        }}
                    >
                        Total BOSS points earned from nominations received and made.
                    </Typography>
                </Stack>

                <Button>How it works</Button>
            </Sheet>

            <Sheet
                variant="outlined"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    minHeight: 250,
                    gap: 5
                }}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Typography
                        textColor="primary.500"
                        sx={{
                            fontSize: '18px'
                        }}
                    >
                        $BOSS Tokens
                    </Typography>
                    <Typography
                        textColor="common.black"
                        sx={{
                            fontSize: '36px',
                            fontWeight: 'bold'
                        }}
                    >
                        1.145
                    </Typography>
                    <Typography
                        textColor="neutral.500"
                        sx={{
                            fontSize: '18px',
                            textAlign: 'center'
                        }}
                    >
                        $BOSS is an ERC-20 token on Base, tradable on Uniswap.
                    </Typography>
                </Stack>

                <Button>Buy $BOSS</Button>
            </Sheet>

            <Sheet
                variant="outlined"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 5,
                    minHeight: 250,
                    gap: 5
                }}
            >
                <Stack
                    sx={{
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <Typography
                        textColor="primary.500"
                        sx={{
                            fontSize: '18px'
                        }}
                    >
                        Builder Score
                    </Typography>
                    <Typography
                        textColor="common.black"
                        sx={{
                            fontSize: '36px',
                            fontWeight: 'bold'
                        }}
                    >
                        63
                    </Typography>
                    <Typography
                        textColor="neutral.500"
                        sx={{
                            fontSize: '18px',
                            textAlign: 'center'
                        }}
                    >
                        The proficiency of Talent Passport users as onchain builders (0-100).
                    </Typography>
                </Stack>

                <Button>Refresh Score</Button>
            </Sheet>
        </Stack>
    );
};
