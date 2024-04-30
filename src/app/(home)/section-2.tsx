import { Button, Link, Sheet, Stack, Typography } from '@mui/joy';
import { Eye, Terminal } from '@/shared/icons';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';

export const Section2 = () => {
    const { open } = useWeb3Modal();
    const { address } = useAccount();
    return (
        <Stack
            component="section"
            sx={{
                maxWidth: { xs: 'md', md: 'lg' },
                flexDirection: { xs: 'column', md: 'row' },
                px: { xs: 2, sm: 8 },
                pt: { xs: 6, sm: 10 },
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
                        lineHeight: '155%',
                        fontWeight: '400'
                    }}
                >
                    BOSS is a meme, a token of appreciation and a social game designed to reward builders via onchain
                    nominations.
                </Typography>
                <Button variant="solid" sx={{ mt: 'auto' }} component={Link} href="/">
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
                        lineHeight: '155%',
                        fontWeight: '400'
                    }}
                >
                    Players have a daily budget of BOSS points to donate to 1 builder a day. Points will convert to
                    $BOSS tokens in June.
                </Typography>

                <Button
                    variant="solid"
                    sx={{ mt: 'auto' }}
                    onClick={() => (address ? (window.location.href = 'https://passport.talentprotocol.com') : open())}
                >
                    {address ? 'Increase allowance' : 'Connect Wallet'}
                </Button>
            </Sheet>
        </Stack>
    );
};
