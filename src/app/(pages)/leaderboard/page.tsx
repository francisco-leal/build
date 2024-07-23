import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { getCurrentWeek } from "@/app/_api/data/nominations";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { TableLeaderboard } from "@/app/_components/table-leaderboard";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const { startOfWeek, endOfWeek } = await getCurrentWeek();
  const lastUpdate = DateTime.fromISO(startOfWeek).toFormat(shortFormat);
  const nextUpdate = DateTime.fromISO(endOfWeek).toFormat(shortFormat);
  const topLeaderboardValues = await getTableLeaderboardValues();

  return (
    <Stack component="main">
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Summer Leaderboard
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard values={topLeaderboardValues} />
        </Stack>
        {topLeaderboardValues.length > 0 && (
          <Typography
            className="no-overflow"
            level="body-sm"
            sx={{ color: "common.white" }}
          >
            Points last update on {lastUpdate}. Next update on {nextUpdate}
          </Typography>
        )}
        {topLeaderboardValues.length === 0 && (
          <Typography
            className="no-overflow"
            level="body-sm"
            sx={{ color: "common.white", mt: 2 }}
          >
            The leaderboard will be updated after the first week of noms.
          </Typography>
        )}
      </HeroSectionWithOverflow>
    </Stack>
  );
}
