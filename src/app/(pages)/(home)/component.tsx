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
          Reward your favorite builders with $BUILD.
          <Box component={"br"} display={{ xs: "none", sm: "initial" }} />{" "}
          Nominations reset every Monday.
        </Typography>
        <SearchBuilder sx={{ mt: 1 }} />
      </HeroSectionSlim>
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
};
