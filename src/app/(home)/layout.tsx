import { Stack, Typography } from "@mui/joy";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { Eye, Interface, MusicHeadeset, Terminal } from "@/shared/icons";
import { HeroSection } from "@/shared/components/hero-section";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { DateTime } from "luxon";

export default async function HomePageLayout({
  leaderboardTable,
  searchBuilder,
  nominateBuilder,
  howToPlay,
}: {
  leaderboardTable: React.ReactNode;
  searchBuilder: React.ReactNode;
  children: React.ReactNode;
  nominateBuilder: React.ReactNode;
  howToPlay: React.ReactNode;
}) {
  const now = DateTime.utc().startOf("hour");
  const format = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(format);
  const nextUpdate = now.plus({ hour: 1 }).toFormat(format);

  return (
    <Stack component="main">
      <HeroSectionSlim>
        <Typography level="h1">
          Nominate <Interface /> the best
          <br />
          builders <MusicHeadeset /> you know.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Celebrate the unsung heroes of the blockchain. Find undervalued
          builders, play the nomination game, and earn BUILD points.
        </Typography>
        {searchBuilder}
      </HeroSectionSlim>
      <HeroSection sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Eye />
          <Typography level="h3" textColor="common.black">
            What is BUILD?
          </Typography>
          <Typography textColor="neutral.500">
            BUILD is a token of appreciation on Base, and a social game that
            rewards onchain builders via peer nominations.
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Terminal />
          <Typography level="h3" textColor="common.black">
            How BUILD works?
          </Typography>
          <Typography textColor="neutral.500">
            Players have a budget of BUILD points to donate to 3 builders/day.
            Points will convert to $BUILD tokens in June.
          </Typography>
        </BlockyCard>
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

        <Typography
          className="no-overflow"
          level="body-sm"
          sx={{ color: "common.white" }}
        >
          Last update on {lastUpdate}. Next update on {nextUpdate}
        </Typography>
      </HeroSectionWithOverflow>
      <HeroSection>{howToPlay}</HeroSection>
      {nominateBuilder}
    </Stack>
  );
}
