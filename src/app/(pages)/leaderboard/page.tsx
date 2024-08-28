import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { getCurrentWeek } from "@/app/_api/data/nominations";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { TableLeaderboard } from "@/app/_components/table-leaderboard";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const startOfWeek = "2024-08-27T09:00:00Z";
  const lastUpdate = DateTime.fromISO(startOfWeek).toFormat(shortFormat);
  const topLeaderboardValues = await getTableLeaderboardValues();

  return (
    <Stack component="main">
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          BUILD top commiters leaderboard
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard values={topLeaderboardValues} />
        </Stack>
        {topLeaderboardValues.length > 0 && (
          <Typography
            className="no-overflow"
            level="body-sm"
            sx={{ color: "common.white", maxWidth: "648px" }}
          >
            BUILD Top Contributors was last updated on {lastUpdate}.<br></br>
            <br></br>
            Commitment points are calculated based on the amount committed
            during round 1, party app contribution, being an LP provider and
            holding $BUILD. Round 2 decisions will affect the standings.
          </Typography>
        )}
      </HeroSectionWithOverflow>
    </Stack>
  );
}
