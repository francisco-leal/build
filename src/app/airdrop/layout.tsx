import { Stack, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { isUserConnected } from "../_api/get-user";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";

export default async function AirdropPageLayout({
  bossPointsCard,
  bossTokensCard,
  builderScoreCard,
  dailyBudgetCard,
  dailyStreakCard,
  leaderboardTable,
  myNominationsTable,
  searchBuilder,
  nominateBuilder,
  howToPlay,
}: {
  bossPointsCard: React.ReactNode;
  bossTokensCard: React.ReactNode;
  builderScoreCard: React.ReactNode;
  dailyBudgetCard: React.ReactNode;
  dailyStreakCard: React.ReactNode;
  leaderboardTable: React.ReactNode;
  howToPlay: React.ReactNode;
  myNominationsTable: React.ReactNode;
  nominateBuilder: React.ReactNode;
  searchBuilder: React.ReactNode;
}) {
  const isConnected = await isUserConnected();

  if (!isConnected) {
    return (
      <Stack component="main">
        <HeroSectionSlim>
          <Typography level="h1">Becoming a BOSS is one click away</Typography>
          <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
            Connect your wallet to start nominating builders and earning $BOSS.
          </Typography>
          <ConnectWalletButton sx={{ my: 2 }} />
        </HeroSectionSlim>
        <HeroSection>{howToPlay}</HeroSection>
      </Stack>
    );
  }

  return (
    <Tabs component={"main"} defaultValue={0}>
      <TabList sx={{ justifyContent: "center" }}>
        <Tab variant="plain">My Nominations</Tab>
        <Tab variant="plain">My Stats</Tab>
      </TabList>

      <TabPanel value={0} component={Stack}>
        <HeroSectionSlim>
          <Typography level="h1">
            Nominate the best builders you know
          </Typography>

          <Typography level="title-lg">
            Name the builders breaking the corporate mold, and receive an
            airdrop of $BOSS. Search their name or share your custom link.
          </Typography>

          {searchBuilder}
        </HeroSectionSlim>
        <HeroSection
          sx={{
            flexDirection: { xs: "column", md: "row" },
            "& > *": { height: 240, width: "100%" },
            gap: 3,
          }}
        >
          {dailyBudgetCard}
          {dailyStreakCard}
        </HeroSection>
        <HeroSectionWithOverflow>
          <Typography
            level="h2"
            className="no-overflow"
            textColor={"common.white"}
          >
            My Nominations
          </Typography>
          <Stack className="overflow">{myNominationsTable}</Stack>
        </HeroSectionWithOverflow>
        <HeroSection>{howToPlay}</HeroSection>
      </TabPanel>

      <TabPanel value={1} component={Stack}>
        <HeroSection
          sx={{
            flexDirection: { xs: "column", md: "row" },
            "& > *": { minHeight: 240, width: "100%" },
            gap: 3,
          }}
        >
          {bossPointsCard}
          {bossTokensCard}
          {builderScoreCard}
        </HeroSection>
        <HeroSectionWithOverflow>
          <Typography
            level="h2"
            className="no-overflow"
            textColor={"common.white"}
          >
            Leaderboard
          </Typography>
          <Stack className="overflow">{leaderboardTable}</Stack>
        </HeroSectionWithOverflow>
        <HeroSection>{howToPlay}</HeroSection>
      </TabPanel>
      {nominateBuilder}
    </Tabs>
  );
}
