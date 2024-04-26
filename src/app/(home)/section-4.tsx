import { Typography, Button, Box, Link, Table, Stack } from '@mui/joy';

export const Section4 = () => {
    return (
        <Stack
            component="section"
            sx={{
                mx: 'auto',
                maxWidth: { xs: 'sm', lg: 'lg' },
                py: { xs: 6, lg: 10 },
                px: { xs: 2, lg: 0 },
                alignItems: 'center',
                gap: 5
            }}
        >
            <Typography sx={{ color: 'common.white', fontSize: '40px', fontWeight: 'bold' }}>Become a BOSS</Typography>

            <Stack sx={{ flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', gap: 3 }}>
                <Stack sx={{ height: '100%', width: { xs: '100%', lg: '50%' }, p: 5, gap: 5, alignItems: 'center' }}>
                    <Stack sx={{ alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: 'common.white', fontSize: '24px', fontWeight: 'bold' }}>
                            Step 1
                        </Typography>

                        <Typography
                            sx={{
                                color: 'common.white',
                                fontSize: '18px',
                                textAlign: 'center',
                                lineHeight: '1'
                            }}
                        >
                            Claim your Talent Passport and increase your Builder Score before the first snapshot, on May
                            7th at 17:59 UTC. The bigger your Builder Score, the higher your daily budget.
                        </Typography>
                    </Stack>

                    <Button variant="solid" color="neutral" component={Link} href="/" underline="none">
                        Claim Talent Passport
                    </Button>
                </Stack>

                <Stack sx={{ height: '100%', width: { xs: '100%', lg: '50%' }, p: 5, gap: 5, alignItems: 'center' }}>
                    <Stack sx={{ alignItems: 'center', gap: 1 }}>
                        <Typography sx={{ color: 'common.white', fontSize: '24px', fontWeight: 'bold' }}>
                            Step 2
                        </Typography>

                        <Typography
                            sx={{
                                color: 'common.white',
                                fontSize: '18px',
                                textAlign: 'center',
                                lineHeight: '1'
                            }}
                        >
                            Join us on party.app until May 7th, to help us raise LP funds and launch the $BOSS token
                            together on May 8th! Read more in the Bossenomics.
                        </Typography>
                    </Stack>

                    <Button variant="solid" color="neutral" component={Link} href="/" underline="none">
                        Join Party
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};
