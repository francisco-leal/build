import { Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { getTableLeaderboardValues } from "@/app/_api/get-table-leaderboard-values";
import { getTableMyNominationsValues } from "@/app/_api/get-table-my-nominations-values";
import { getCurrentUser } from "@/app/_api/get-user";
import { CardBossPoints } from "@/app/_components/card-boss-points";
import { CardBossTokens } from "@/app/_components/card-boss-tokens";
import { CardBuilderScore } from "@/app/_components/card-builder-score";
import { CardDailyBudget } from "@/app/_components/card-daily-budget";
import { CardDailyStreak } from "@/app/_components/card-daily-streak";
import { HowToPlay } from "@/app/_components/how-to-play";
import { PlaceholderUserNotConnected } from "@/app/_components/placeholder-user-not-connected";
import { SearchBuilder } from "@/app/_components/search-builder";
import { TableLeaderboard } from "@/app/_components/table-leaderboard";
import { TableMyNominations } from "@/app/_components/table-my-nominations";
import { default as backgroundImage } from "@/app/_images/icons-background.png";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default async function AirdropPage() {
  const user = await getCurrentUser();
  if (!user) return <PlaceholderUserNotConnected />;

  const tableMyNominationValues = await getTableMyNominationsValues();
  const tableLeaderboardValues = await getTableLeaderboardValues();

  return (
    <Tabs component={"main"} defaultValue={0}>
      <TabList sx={{ justifyContent: "center" }}>
        <Tab variant="plain">My Nominations</Tab>
        <Tab variant="plain">My Stats</Tab>
      </TabList>

      <TabPanel value={0} component={Stack}>
        <HeroSectionSlim backgroundImage={backgroundImage.src}>
          <Typography level="h1">
            Nominate the best builders you know
          </Typography>

          <Typography level="title-lg">
            Reward your favorite builders with $BUILD tokens, and earn 10% of
            every nomination. Search for their name or share your custom link.
          </Typography>

          <SearchBuilder sx={{ mt: 1 }} />
        </HeroSectionSlim>
        <HeroSection
          sx={{
            flexDirection: { xs: "column", md: "row" },
            "& > *": { height: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardDailyBudget budget={user.boss_budget} />
          <CardDailyStreak streak={user.boss_nomination_streak} />
        </HeroSection>
        <HeroSectionWithOverflow>
          <Typography
            level="h2"
            className="no-overflow"
            textColor={"common.white"}
          >
            My Nominations
          </Typography>
          <Stack className="overflow">
            <TableMyNominations values={tableMyNominationValues} />
          </Stack>
        </HeroSectionWithOverflow>
        <HeroSection>
          <HowToPlay />
        </HeroSection>
      </TabPanel>

      <TabPanel value={1} component={Stack}>
        <HeroSection
          sx={{
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          <CardBossPoints points={user.boss_score} />
          <CardBossTokens tokens={user.boss_token_balance} />
          <CardBuilderScore score={user.passport_builder_score} />
        </HeroSection>
        <HeroSectionWithOverflow>
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
        </HeroSectionWithOverflow>
        <HeroSection>
          <HowToPlay />
        </HeroSection>
      </TabPanel>
    </Tabs>
  );
}
