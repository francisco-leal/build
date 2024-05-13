import { Typography, Stack, Button, Link } from "@mui/joy";
import { DateTime } from "luxon";
import backgroundImage from "@/app/_images/icons-background.png";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { Interface } from "@/shared/icons/interface";
import { Lego } from "@/shared/icons/lego";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { Terminal } from "@/shared/icons/terminal";

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
      <HeroSectionSlim backgroundImage={backgroundImage.src}>
        <Typography level="h1">
          Nominate <Interface /> the best
          <br />
          builders <MusicHeadset /> you know.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Celebrate the unsung heroes of the blockchain. Find undervalued
          builders, play the nomination game, and earn BUILD points.
        </Typography>
        {searchBuilder}
      </HeroSectionSlim>
      <HeroSection sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Lego />
          <Typography level="h3" textColor="common.black">
            What is BUILD?
          </Typography>
          <Typography textColor="neutral.500">
            BUILD is a token of appreciation on Base, and a social game that
            rewards onchain builders via peer nominations.
          </Typography>
          <Button
            href={"/uniswap"}
            component={Link}
            disabled={true}
            variant="solid"
            color="neutral"
            sx={{ mt: 2 }}
          >
            Buy $BUILD
          </Button>
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
          <Button
            href={"/airdrop"}
            component={Link}
            variant="solid"
            color="primary"
            sx={{ mt: 2 }}
          >
            See BUILD budget
          </Button>
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
