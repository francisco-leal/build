import { Stack, Typography } from '@mui/joy';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/shared/context/user';
import { LeaderboardData, User, UserStats, LeaderboardUser } from '@/shared/interfaces';
import { HeroSectionWithOverflow } from '@/shared/components/hero-section-with-overflow';
import { TableRankings } from '@/shared/components/table-rankings';

export const Section3 = () => {
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
                        boss_score: stats?.boss_score,
                        builder_score: stats?.builder_score,
                        nominations: stats?.nominations,
                        rank: leaderboardUser.rank,
                        highlight: lUser.wallet_address === user?.wallet_address
                    } as LeaderboardUser;
                });

                setLeaderboardData(users);
            });
    }, [user?.wallet_address]);

    return (
        <HeroSectionWithOverflow>
            <Typography level="h2" className="no-overflow" textColor={'common.white'}>
                Layoff Leaderboard
            </Typography>

            <Stack className="overflow">
                <TableRankings values={leaderboardData} />
            </Stack>

            {/* @TODO: Add leaderboard schedule */}
            {/*
            <Typography  className="no-overflow" sx={{ color: 'common.white', fontSize: '14px' }}>
                Last update on Apr 30th, 4pm UTC. Next update on May 1st, 4pm UTC
            </Typography> 
            */}
        </HeroSectionWithOverflow>
    );
};
