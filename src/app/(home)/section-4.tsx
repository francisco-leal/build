import { Coin, UserShield } from '@/shared/icons';
import { Typography, Button, Box, Link, Table, Stack } from '@mui/joy';

export const Section4 = () => {
    return (
        <Stack
            component="section"
            sx={{
                maxWidth: { xs: 'md', md: 'lg' },
                px: { xs: 2, sm: 8 },
                pt: { xs: 6, sm: 10 },
                pb: 10,
                mx: 'auto',
                textAlign: 'center',
                gap: 5
            }}
        >
            <Typography sx={{ color: 'common.white', fontSize: '40px', fontWeight: 'bold' }}>Become a BOSS</Typography>

            <Stack sx={{ flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 3 }}>
                <Stack sx={{ height: '100%', flex: 1, p: 5, gap: 5, alignItems: 'center' }}>
                    <Stack sx={{ alignItems: 'center', gap: 1 }}>
                        <UserShield sx={{ color: 'common.white', fontSize: '64px' }} />
                        <Typography sx={{ color: 'common.white', fontSize: '24px', fontWeight: 'bold' }}>
                            Step 1
                        </Typography>

                        <Typography
                            sx={{
                                color: 'common.white',
                                fontSize: '18px',
                                textAlign: 'center',
                                fontWeight: 400,
                                lineHeight: '155%'
                            }}
                        >
                            Claim your Talent Passport, and increase your Builder Score before the first snapshot, on
                            May 7th at 17:59 UTC.
                        </Typography>
                    </Stack>

                    <Button
                        variant="solid"
                        color="neutral"
                        component={Link}
                        href="https://passport.talentprotocol.com"
                        target="_blank"
                    >
                        Claim Talent Passport
                    </Button>
                </Stack>

                <Stack sx={{ height: '100%', flex: 1, p: 5, gap: 5, alignItems: 'center' }}>
                    <Stack sx={{ alignItems: 'center', gap: 1 }}>
                        <Coin sx={{ color: 'common.white', fontSize: '64px' }} />
                        <Typography sx={{ color: 'common.white', fontSize: '24px', fontWeight: 'bold' }}>
                            Step 2
                        </Typography>

                        <Typography
                            sx={{
                                color: 'common.white',
                                fontSize: '18px',
                                textAlign: 'center',
                                fontWeight: 400,
                                lineHeight: '155%'
                            }}
                        >
                            Join on party.app until May 7th, to help us raise LP funds and launch the $BOSS token
                            together! More info in Bossnomics.
                        </Typography>
                    </Stack>

                    <Button variant="solid" color="neutral" component={Link} href="/" disabled={true}>
                        Join Party
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
