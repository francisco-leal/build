"use client";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  tabClasses,
  tabPanelClasses,
} from "@mui/joy";
import { Header } from "@/shared/components/header";
import { Footer } from "@/shared/components/footer";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";

export default function AirdropPageLayout({
  bossPointsCard,
  bossTokensCard,
  builderScoreCard,
  dailyBudgetCard,
  dailyStreakCard,
  leaderboardTable,
  myNominationsTable,
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
}) {
  return (
    <>
      <Header />
      <Tabs
        component={"main"}
        defaultValue={0}
        sx={{
          p: 0,
          mt: 1,
          backgroundColor: "transparent",
          "--Tab-indicatorThickness": "1px",

          [`& .${tabClasses.root}`]: {
            color: "common.white",
            backgroundColor: "transparent",
            "&::after": {
              color: "common.white",
            },
            [`&:not(.${tabClasses.selected}, [aria-selected="true"]):hover`]: {
              color: "primary.700",
              backgroundColor: "transparent",
            },
            [`&.${tabClasses.selected}`]: {
              color: "primary.700",
              backgroundColor: "transparent",
            },
          },
          [`& .${tabPanelClasses.root}`]: {
            p: 0,
          },
        }}
      >
        <TabList sx={{ justifyContent: "center" }}>
          <Tab variant="plain">My Nominations</Tab>
          <Tab variant="plain">My Stats</Tab>
        </TabList>

        <TabPanel value={0} component={Stack}>
          <HeroSectionSlim>{nominateBuilder}</HeroSectionSlim>
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
              Leadearboard
            </Typography>
            <Stack className="overflow">{leaderboardTable}</Stack>
          </HeroSectionWithOverflow>
          <HeroSection>{howToPlay}</HeroSection>
        </TabPanel>
      </Tabs>
      <Footer />
    </>
  );
}
