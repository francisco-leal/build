import { Typography, Stack } from '@mui/joy';
import { RankingsTable } from '@/shared/components/rankings-table';

export const Section3 = () => {
    const mockData = [
        { id: 1, name: 'Tiago', score: 50, points: 2000, nominations: 10 },
        { id: 2, name: 'Leal', score: 150, points: 4000, nominations: 70 },
        { id: 3, name: 'Filipe', score: 200, points: 10000, nominations: 50 },
        { id: 4, name: 'Pedro', score: 100, points: 8000, nominations: 30 }
    ];

    return (
        <Stack
            component="section"
            sx={{
                py: 10,
                pl: { xs: 2, sm: 8 },
                pr: { xs: 0, md: 8 },
                maxWidth: { xs: 'md', md: 'lg' },
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                position: 'relative',
                overflowX: 'hidden',
                textAlign: 'center',
                gap: 2
            }}
        >
            <Typography
                sx={{
                    color: 'common.white',
                    fontSize: { xs: 30, md: '40px' },
                    pr: { xs: 2, sm: 0 },
                    fontWeight: 'bold'
                }}
            >
                Ecosystem
            </Typography>

            <Typography sx={{ color: 'common.white', fontSize: '18px', fontWeight: '600' }}>
                20% of the funds have been distributed.
            </Typography>

            <Stack sx={{ width: '100%', overflowX: 'scroll', display: { md: 'none' } }}>
                <RankingsTable
                    values={mockData}
                    sx={{
                        width: { xs: 980 },
                        mr: { xs: 8 },
                        my: 4
                    }}
                />
            </Stack>

            <RankingsTable
                values={mockData}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '100%',
                    my: 4
                }}
            />
        </Stack>
    );
};
