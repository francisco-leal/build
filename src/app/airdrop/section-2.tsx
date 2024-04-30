import { Sheet, Stack, Typography, Link } from '@mui/joy';
import { EyeDailyBudget, FireNominationStreak } from '@/shared/icons';

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
                    gap: 1
                }}
            >
                <Typography
                    textColor="primary.500"
                    sx={{
                        fontSize: '18px'
                    }}
                >
                    Daily Budget
                </Typography>

                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                    <EyeDailyBudget sx={{ width: 48, height: 48, color: 'primary.500' }} />
                    <Typography
                        textColor="common.black"
                        sx={{
                            fontSize: '36px',
                            fontWeight: 'bold'
                        }}
                    >
                        100
                    </Typography>
                </Stack>

                <Typography
                    textColor="neutral.500"
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center'
                    }}
                >
                    Recalculated daily at 00:00 UTC, based on your BOSS Points, Builder Score, and Streak. Read more in{' '}
                    <Link
                        href="https://bosscommunity.notion.site/BOSS-FAQ-0a7dabb972e1442382f2cf0dad00ed4e?pvs=4"
                        target="_blank"
                        textColor="neutral.500"
                        sx={{ textDecoration: 'underline' }}
                    >
                        FAQ
                    </Link>
                    .
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
                    gap: 1
                }}
            >
                <Typography
                    textColor="primary.500"
                    sx={{
                        fontSize: '18px'
                    }}
                >
                    Nomination Streak
                </Typography>

                <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                    <FireNominationStreak sx={{ width: 32, height: 32, color: 'primary.500' }} />
                    <Typography
                        textColor="common.black"
                        sx={{
                            fontSize: '36px',
                            fontWeight: 'bold'
                        }}
                    >
                        5 days
                    </Typography>
                </Stack>

                <Typography
                    textColor="neutral.500"
                    sx={{
                        fontSize: '18px',
                        textAlign: 'center'
                    }}
                >
                    Consecutive days you nominated someone.
                </Typography>
            </Sheet>
        </Stack>
    );
};
