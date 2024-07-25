"use client";

import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link, Box } from "@mui/joy";
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
import { Refresh } from "@/shared/icons/refresh";
import { formatNumber, formatLargeNumber } from "@/shared/utils/format-number";

type HomePageComponentProps = {
  loading?: boolean;
  nominationsCount?: number;
  usersCount?: number;
  followersCount?: number;
};

const BUILD_TOKEN_ADDRESS = "0x3C281A39944a2319aA653D81Cfd93Ca10983D234";

export const HomePageComponent: FunctionComponent<HomePageComponentProps> = ({
  nominationsCount,
  usersCount,
  followersCount,
}) => {
  return (
    <Stack component="main" sx={{ position: "relative" }}>
      <BackgroundImage />
      <HeroSectionSlim sx={{ mb: 0 }}>
        <Typography level="h1">
          Nominate <Interface /> your favorite <MusicHeadset /> builders.
        </Typography>

        <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
          Reward your favorite builders with $BUILD points.
          <Box component={"br"} display={{ xs: "none", sm: "initial" }} />{" "}
          Nominations reset every Tuesday.
        </Typography>
        <SearchBuilder sx={{ mt: 1 }} />
      </HeroSectionSlim>

      <HeroSection>
        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <Lego sx={{ fontSize: "64px" }} />
            <Typography level="h3">What is BUILD?</Typography>
            <Typography sx={{ maxWidth: "600px" }}>
              $BUILD is a token of appreciation on Base, and a nominations game
              to reward onchain builders.
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="solid"
                color="neutral"
                component={Link}
                href="/stats"
                target="_blank"
                underline="none"
                sx={{ mt: 2 }}
              >
                Check stats
              </Button>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                href="https://paragraph.xyz/@macedo/build-log-8"
                target="_blank"
                underline="none"
                sx={{ mt: 2 }}
              >
                Learn more
              </Button>
            </Box>
          </Stack>
        </Stack>
      </HeroSection>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
          <Typography level="body-lg" textColor="primary.500">
            Nominations
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
            <MusicHeadset sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(1794755 + (nominationsCount ?? 0), 0)}
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
          <Typography level="body-lg" textColor="primary.500">
            $BUILD holders
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
            <Interface sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(88813 ?? 0, 0)}
          </Typography>
        </BlockyCard>
      </HeroSection>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
          <Typography level="body-lg" textColor="primary.500">
            Followers in /build
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
            <Refresh sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(followersCount ?? 34200, 0)}
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
          <Typography level="body-lg" textColor="primary.500">
            Round 2 Builders
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
            <Coin sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(usersCount ?? 0, 0)}
          </Typography>
        </BlockyCard>
      </HeroSection>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
};
