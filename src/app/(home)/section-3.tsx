import { Stack, Typography } from "@mui/joy";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "@/shared/context/user";
import { LeaderboardData, LeaderboardUser } from "@/shared/interfaces";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { TableRankings } from "@/shared/components/table-rankings";

export const Section3 = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        const users: LeaderboardUser[] = data.leaderboard.map(
          (leaderboardUser: LeaderboardData, index: number) => {
            return {
              id: index,
              ...leaderboardUser,
              highlight:
                leaderboardUser.wallet_address.toLowerCase() ===
                user?.wallet_address.toLowerCase(),
            } as LeaderboardUser;
          }
        );

        setLeaderboardData(users);
      });
  }, [user?.wallet_address]);

  return (
    <HeroSectionWithOverflow>
      <Typography level="h2" className="no-overflow" textColor={"common.white"}>
        Leaderboard
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
