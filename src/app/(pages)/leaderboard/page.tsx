import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { getTableUndiscoveredBuildersValues } from "@/app/_api/functions/get-table-undiscovered-builders-values";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { TableLeaderboard } from "@/app/_components/table-leaderboard";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const now = DateTime.utc().startOf("hour");
  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(shortFormat);
  const nextUpdate = now.plus({ hour: 1 }).toFormat(shortFormat);
  const topLeaderboardValues = await getTableLeaderboardValues();
  // const undiscoveredBoardValues = await getTableUndiscoveredBuildersValues();

  return (
    <Stack component="main">
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        {/* <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Undiscovered Builders
        </Typography>
        <Typography
          level="body-sm"
          className="no-overflow"
          sx={{ color: "common.white", marginBottom: 2 }}
        >
          Builders that received valuable nominations, but still have 3 or less
          total nominations.
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard values={undiscoveredBoardValues} />
        </Stack> */}
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Leaderboard
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard values={topLeaderboardValues} />
        </Stack>
        <Typography
          className="no-overflow"
          level="body-sm"
          sx={{ color: "common.white" }}
        >
          Last update on {lastUpdate}. Next update on {nextUpdate}
        </Typography>
      </HeroSectionWithOverflow>

      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
}
