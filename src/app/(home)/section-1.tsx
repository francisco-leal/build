import { Box, Button, Link, Stack, Typography } from '@mui/joy';

export const Section1 = () => (
    <Stack
        component="section"
        sx={{
            pt: { xs: 10, lg: 18 },
            pb: 10,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        }}
    >
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
                backgroundImage: { lg: 'url(/images/homepage.png)' },
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
        />
        <Stack
            sx={{
                maxWidth: 'sm',
                px: 2,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Typography
                level="h1"
                sx={{
                    color: 'common.white',
                    fontSize: { xs: '37px', sm: '64px' },
                    fontWeight: 'bold',
                    textAlign: 'center',
                    lineHeight: '1'
                }}
            >
                Dear builder,
                <br /> you&apos;re fired.
            </Typography>

            <Typography
                sx={{
                    pt: { xs: 2, sm: 5 },
                    color: 'common.white',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >
                There&apos;s no room for builders in the corporate world. Read the memo and help us keep the status quo:
                nominate the builders you know.
            </Typography>

            <Stack
                sx={{
                    flexDirection: { xs: 'column-reverse', sm: 'row' },
                    alignItems: 'center',
                    gap: 2,
                    pt: 5
                }}
            >
                <Button variant="outlined" component={Link} href="/" underline="none">
                    Read BOSS Memo
                </Button>

                <Button variant="solid" color="neutral" component={Link} href="/" underline="none">
                    Mint Builders Manifesto
                </Button>
            </Stack>
        </Stack>
    </Stack>
);
