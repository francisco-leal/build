import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link } from "@mui/joy";
import { DateTime } from "luxon";
import { HowToPlay } from "@/app/_components/how-to-play";
import { SearchBuilder } from "@/app/_components/search-builder";
import {
  TableLeaderboard,
  TableLeaderboardValue,
} from "@/app/_components/table-leaderboard";
import { default as backgroundImage } from "@/app/_images/icons-background.png";
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
};

export const HomePageComponent: FunctionComponent<HomePageComponentProps> = ({
  loading,
  tableLeaderboardValues,
}) => {
  const now = DateTime.utc().startOf("hour");
  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(shortFormat);
  const nextUpdate = now.plus({ hour: 1 }).toFormat(shortFormat);

  return (
    <Stack component="main">
      <HeroSectionSlim backgroundImage={backgroundImage.src} sx={{ mb: 0 }}>
        <Typography level="h1">
          Nominate <Interface /> the best
          <br />
          builders <MusicHeadset /> you know.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Celebrate the unsung heroes of the blockchain.
          <br />
          Nominate undervalued builders and earn BUILD points.
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
      <HeroSectionWithOverflow>
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
};
