import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link, Box } from "@mui/joy";
import { DateTime } from "luxon";
import { getNominationsCountOverall } from "@/app/_api/data/nominations";
import { BackgroundImage } from "@/app/_components/background-image";
import { HowToPlay } from "@/app/_components/how-to-play";
import { SearchBuilder } from "@/app/_components/search-builder";
import {
  TableLeaderboard,
  TableLeaderboardValue,
} from "@/app/_components/table-leaderboard";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { Interface } from "@/shared/icons/interface";
import { Lego } from "@/shared/icons/lego";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { Terminal } from "@/shared/icons/terminal";

type HomePageComponentProps = {
  loading?: boolean;
  tableLeaderboardValues?: TableLeaderboardValue[];
  nominationsCount?: number;
  usersCount?: number;
};

export const HomePageComponent: FunctionComponent<HomePageComponentProps> = ({
  loading,
  tableLeaderboardValues,
  nominationsCount,
  usersCount,
}) => {
  const now = DateTime.utc().startOf("hour");
  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(shortFormat);
  const nextUpdate = now.plus({ hour: 1 }).toFormat(shortFormat);

  return (
    <Stack component="main" sx={{ position: "relative" }}>
      <BackgroundImage />
      <HeroSectionSlim sx={{ mb: 0 }}>
        <Typography level="h1">
          Nominate <Interface /> the best builders <MusicHeadset /> you know.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Celebrate the unsung onchain heroes.{" "}
          <Box component={"br"} display={{ xs: "none", sm: "initial" }} />
          Nominate incredible builders to give and earn BUILD
        </Typography>
        <SearchBuilder sx={{ mt: 1 }} />
      </HeroSectionSlim>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
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
            href={
              "https://app.uniswap.org/explore/tokens/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
            }
            target="_blank"
            component={Link}
            variant="solid"
            color="primary"
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
            href={"/airdrop/#daily-budget"}
            component={Link}
            variant="solid"
            color="primary"
            sx={{ mt: 2 }}
          >
            See BUILD budget
          </Button>
        </BlockyCard>
      </HeroSection>
      <HeroSectionWithOverflow id="leaderboard">
        <Typography
          level="h2"
          className="no-overflow"
          textColor={"common.white"}
        >
          Leaderboard
        </Typography>
        <Stack className="overflow">
          <TableLeaderboard loading={loading} values={tableLeaderboardValues} />
        </Stack>
      </HeroSectionWithOverflow>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
        <BlockyCard sx={{ minHeight: 164 }}>
          <Typography level="body-lg" textColor="primary.500">
            Total Builders
          </Typography>
          <Typography
            textColor="neutral.900"
            sx={{
              fontWeight: 700,
              lineHeight: "133%",
              fontSize: "36px",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <MusicHeadset sx={{ "&&": { height: 32, width: 32 } }} />{" "}
            {usersCount}
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 164 }}>
          <Typography level="body-lg" textColor="primary.500">
            Total Nominations
          </Typography>
          <Typography
            textColor="neutral.900"
            sx={{
              fontWeight: 700,
              lineHeight: "133%",
              fontSize: "36px",
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Interface sx={{ "&&": { height: 32, width: 32 } }} />{" "}
            {nominationsCount}
          </Typography>
        </BlockyCard>
      </HeroSection>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
        <Typography
          className="no-overflow"
          level="body-sm"
          sx={{ color: "common.white" }}
        >
          Last update on {lastUpdate}. Next update on {nextUpdate}
        </Typography>
      </HeroSection>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
};
