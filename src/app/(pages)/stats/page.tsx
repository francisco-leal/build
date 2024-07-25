import { Stack, Typography, Box } from "@mui/joy";
import { getCurrentUser } from "@/app/_api/data/users";
import { getTableNominationsReceivedValues } from "@/app/_api/functions/get-table-nominations-received-values";
import { getTableNominationsSentValues } from "@/app/_api/functions/get-table-nominations-sent-values";
import { recalculateBuilderBudget } from "@/app/_api/functions/recalculate-budget";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuildCommitted } from "@/app/_components/card-build-commited";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { TableNominationsReceived } from "@/app/_components/table-nominations-received";
import { TableNominationsSent } from "@/app/_components/table-nominations-sent";
import { HeroSection } from "@/shared/components/hero-section";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const nominationsSent = await getTableNominationsSentValues();
  const nominationsReceived = await getTableNominationsReceivedValues();

  return (
    <Stack component="main" sx={{ color: "common.white" }}>
      <HeroSection mt={0}>
        <Typography level="h2">My Stats</Typography>
        <Stack
          sx={{
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardBuildCommitted buildCommited={user.build_commit_amount} />
          <CardBossTokens />
          <CardBuilderScore
            score={user.passport_builder_score}
          />
        </Stack>
        <Stack
          sx={{
            mt: 3,
            width: "100%",
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardDailyBudget
            budget={user.boss_budget}
            lastCalculation={user.last_budget_calculation}
            recalculate={recalculateBuilderBudget}
          />
          <CardBossPoints points={user.boss_score} />
        </Stack>
      </HeroSection>
      <HeroSection
        sx={{
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography level="h2" className="no-overflow">
            Last Noms Received
          </Typography>
          <Stack className="overflow">
            <TableNominationsReceived values={nominationsReceived} />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography level="h2" className="no-overflow">
            Last Noms Sent
          </Typography>
          <Stack className="overflow">
            <TableNominationsSent values={nominationsSent} />
          </Stack>
        </Box>
      </HeroSection>
    </Stack>
  );
}
