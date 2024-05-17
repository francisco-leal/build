import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { recalculateBuilderBudget } from "@/app/_api/functions/recalculate-budget";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
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
  const tableLeaderboardValues = await getTableLeaderboardValues();

  return (
    <Stack component="main">
      <HeroSectionWithOverflow sx={{ mt: 0 }}>
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Leaderboard
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard values={tableLeaderboardValues} />
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
