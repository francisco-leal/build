import { Typography, Stack } from '@mui/joy';
import { RankingsTable } from '@/shared/components/rankings-table';
import { LeaderboardUser } from '@/shared/interfaces';

export const Section3 = () => {
    const mockData: LeaderboardUser[] = [
        {
            id: 1,
            name: 'Tiago',
            builder_score: 50,
            boss_score: 2000,
            nominations: 10,
            rank: 1,
            highlight: false,
            wallet: '0x33041027dd8F4dC82B6e825FB37ADf8f15d44053'
        },
        {
            id: 2,
            name: 'Leal',
            builder_score: 150,
            boss_score: 4000,
            nominations: 70,
            rank: 1,
            highlight: false,
            wallet: '0x33041027dd8F4dC82B6e825FB37ADf8f15d44053'
        },
        {
            id: 3,
            name: 'Filipe',
            builder_score: 200,
            boss_score: 10000,
            nominations: 50,
            rank: 1,
            highlight: false,
            wallet: '0x33041027dd8F4dC82B6e825FB37ADf8f15d44053'
        },
        {
            id: 4,
            name: 'Pedro',
            builder_score: 100,
            boss_score: 8000,
            nominations: 30,
            rank: 1,
            highlight: false,
            wallet: '0x33041027dd8F4dC82B6e825FB37ADf8f15d44053'
        }
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
