'use client'
import { Stack, Typography } from '@mui/joy';
import { RankingsTable } from '@/shared/components/rankings-table';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/shared/context/user';
import { LeaderboardData, User, UserStats, LeaderboardUser } from '@/shared/interfaces';

export const Section6 = () => {
    const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        fetch('/api/leaderboard')
            .then(response => response.json())
            .then(data => {
                const users: LeaderboardUser[] = data.leaderboard.map((leaderboardUser: LeaderboardData) => {
                    const lUser = data.users.find((u: User) => u.id === leaderboardUser.user_id);
                    const stats = data.userStats.find((s: UserStats) => s.user_id === leaderboardUser.user_id);
                    return {
                        id: leaderboardUser.user_id,
                        name: lUser.username,
                        wallet: lUser.wallet_address,
                        boss_score: stats.boss_score,
                        builder_score: stats.builder_score,
                        nominations: stats.nominations,
                        rank: leaderboardUser.rank,
                        highlight: lUser.wallet_address === user?.wallet_address
                    } as LeaderboardUser;
                });

                setLeaderboardData(users);
            });
    }, [user?.wallet_address]);

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
                textAlign: 'center'
            }}
        >
            <Typography
                sx={{
                    color: 'common.white',
                    fontSize: { xs: "30px", md: '32px' },
                    pr: { xs: 2, sm: 0 },
                    fontWeight: 'bold'
                }}
            >
                Leaderboard
            </Typography>

            <Stack sx={{ width: '100%', overflowX: 'scroll', display: { md: 'none' } }}>
                <RankingsTable
                    values={leaderboardData}
                    sx={{
                        width: { xs: 980 },
                        mr: { xs: 8 },
                        my: 4
                    }}
                />
            </Stack>

            <RankingsTable
                values={leaderboardData}
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '100%',
                    my: 4
                }}
            />
        </Stack>
    );
};
