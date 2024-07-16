"use client";

import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link, Box } from "@mui/joy";
import { formatEther } from "viem";
import { BackgroundImage } from "@/app/_components/background-image";
import { HowToPlay } from "@/app/_components/how-to-play";
import { SearchBuilder } from "@/app/_components/search-builder";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { Coin } from "@/shared/icons/coin";
import { Interface } from "@/shared/icons/interface";
import { Lego } from "@/shared/icons/lego";
import { MusicHeadset } from "@/shared/icons/music-headset";
import { Terminal } from "@/shared/icons/terminal";
import { formatNumber } from "@/shared/utils/format-number";

type HomePageComponentProps = {
  loading?: boolean;
  nominationsCount?: number;
  usersCount?: number;
};

const BUILD_TOKEN_ADDRESS = "0x3C281A39944a2319aA653D81Cfd93Ca10983D234";

export const HomePageComponent: FunctionComponent<HomePageComponentProps> = ({
  nominationsCount,
  usersCount,
}) => {
  return (
    <Stack component="main" sx={{ position: "relative" }}>
      <BackgroundImage />
      <HeroSectionSlim sx={{ mb: 0 }}>
        <Typography level="h1">
          Nominate <Interface /> your favorite <MusicHeadset /> builders.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Reward your favorite builders with $BUILD every week.
          <Box component={"br"} display={{ xs: "none", sm: "initial" }} />{" "}
          Nominations reset every Monday.
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
            BUILD is a token of appreciation on Base, and a nominations game to
            reward onchain builders.<br></br>
            <strong>Nominations</strong>:{" "}
            {formatNumber(1794755 + (nominationsCount ?? 0), 0)}
            <br></br>
            <strong>Holders</strong>: 89,064<br></br>
            <strong>Casts</strong>: 55,894<br></br>
            <strong>Market Cap</strong>: $2.40M
          </Typography>
          <Button
            href={"/stats"}
            component={Link}
            variant="solid"
            color="primary"
            sx={{ mt: 2 }}
          >
            Check Points
          </Button>
          <Button
            href={"https://build.top"}
            target="_blank"
            component={Link}
            variant="solid"
            color="neutral"
            sx={{ mt: 2 }}
          >
            Learn More
          </Button>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 250 }}>
          <Terminal />
          <Typography level="h3" textColor="common.black">
            How BUILD works?
          </Typography>
          <Typography textColor="neutral.500">
            <strong>Budget</strong>: Each player has an individual budget, based
            on their Builder Score, $BUILD commited in Airdrop 1 and $BUILD
            held. Claim your Talent Passport to increase your score and budget.
          </Typography>
          <Typography textColor="neutral.500">
            <strong>Nominations</strong>: Search username or share your link to
            nominate builders weekly. Your budget will be distributed equally
            each week.
          </Typography>
          <Typography textColor="neutral.500">
            <strong>Airdrop</strong>: BUILD Points convert into $BUILD tokens.
            There is 50M $BUILD to be distributed this round. $BUILD is 100%
            community owned. No team or investors allocation.
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
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
};
