import { Button, Link, Sheet, Stack, Typography } from '@mui/joy';
import { Eye, Terminal } from '../shared/icons';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export const Section2 = () => {
    const { open } = useWeb3Modal();
    return (
        <Stack
            sx={{
                maxWidth: { xs: 'sm', lg: 'lg' },
                flexDirection: { xs: 'column', lg: 'row' },
                px: { xs: 2, md: 8 },
                pt: { xs: 6, md: 10 },
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
                    py: 5,
                    px: 2,
                    minHeight: 250
                }}
            >
                <Eye sx={{ width: 48, height: 48 }} color="primary" />
                <Typography
                    level="h3"
                    textColor="common.black"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}
                >
                    What is BOSS?
                </Typography>
                <Typography
                    textColor="neutral.500"
                    sx={{
                        py: 2,
                        fontSize: '18px',
                        textAlign: 'center',
                        lineHeight: '1'
                    }}
                >
                    BOSS is a meme, a token of appreciation and a social game designed to reward builders via onchain
                    nominations.
                </Typography>
                <Button variant="solid" sx={{ mt: 'auto' }} component={Link} href="/" underline="none">
                    Get $BOSS
                </Button>
            </Sheet>

            <Sheet
                variant="outlined"
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 5,
                    px: 2,
                    minHeight: 250
                }}
            >
                <Terminal sx={{ width: 48, height: 48 }} color="primary" />
                <Typography
                    level="h3"
                    textColor="common.black"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}
                >
                    How BOSS works?
                </Typography>
                <Typography
                    textColor="neutral.500"
                    sx={{
                        py: 2,
                        fontSize: '18px',
                        textAlign: 'center',
                        lineHeight: '1'
                    }}
                >
                    SocialFi users will have a daily budget of BOSS points, and can nominate 1 builder per day to
                    receive it. Read more in the FAQ.
                </Typography>

                <Button variant="solid" sx={{ mt: 'auto' }} onClick={() => open()}>
                    Connect Wallet
                </Button>
            </Sheet>
        </Stack>
    );
};
