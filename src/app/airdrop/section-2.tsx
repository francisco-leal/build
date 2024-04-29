import { Sheet, Stack, Typography } from '@mui/joy';

export const Section2 = () => {
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
                    gap: 1,
                }}
            >
                <Typography
                    textColor="primary.500"
                    sx={{
                        fontSize: '18px',
                    }}
                >
                    Daily Budget
                </Typography>
                <Typography
                    textColor="common.black"
                    sx={{
                        fontSize: '36px',
                        fontWeight: 'bold'
                    }}
                >
                    100
                </Typography>
                <Typography
                    textColor="neutral.500"
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center',
                    }}
                >
                    Recalculated daily at 00:00 UTC, based on your BOSS Points, Builder Score, and Streak. Read more in FAQ.
                </Typography>
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
                    gap: 1,
                }}
            >
                <Typography
                    textColor="primary.500"
                    sx={{
                        fontSize: '18px',
                    }}
                >
                    Nomination Streak
                </Typography>
                <Typography
                    textColor="common.black"
                    sx={{
                        fontSize: '36px',
                        fontWeight: 'bold'
                    }}
                >
                    5 days
                </Typography>
                <Typography
                    textColor="neutral.500"
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center',
                    }}
                >
                    Consecutive days you nominated someone.
                </Typography>
            </Sheet>
        </Stack>
    );
};
