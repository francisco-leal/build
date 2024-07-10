"use client";

import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link, Box } from "@mui/joy";
import { erc20Abi, formatEther } from "viem";
import { base } from "viem/chains";
import { useReadContract } from "wagmi";
import { BackgroundImage } from "@/app/_components/background-image";
import HeroTag from "@/app/_components/hero-tag";
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
  const { data: tokens, isLoading } = useReadContract({
    abi: erc20Abi,
    address: BUILD_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: ["0x5589fd6856534a3adfe16173aa308d2dc0e8fb5b"],
    chainId: base.id,
  });

  return (
    <Stack component="main" sx={{ position: "relative" }}>
      <BackgroundImage />

      <HeroSectionSlim sx={{ mb: 0 }}>
        <HeroTag progress="SOON" tag="Summer Fund" />
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
      <HeroSection sx={{ gap: 3, mt: { xs: 0, md: -6 }, maxWidth: "600px" }}>
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
          <Typography level="title-lg" textColor="primary.500">
            BUILD Summer Fund
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
            {isLoading
              ? "---.--"
              : formatNumber(
                  parseInt(formatEther(tokens ?? 62017513678n * 10n ** 18n)),
                  0,
                )}
          </Typography>
        </BlockyCard>
      </HeroSection>
      <HeroSection
        sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3, mt: 0 }}
      >
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
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
            <MusicHeadset sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(usersCount ?? 0, 0)}
          </Typography>
        </BlockyCard>
        <BlockyCard sx={{ minHeight: 164, width: "100%" }}>
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
            <Interface sx={{ "&&": { height: 32, width: 32 } }} />
            {formatNumber(nominationsCount ?? 0, 0)}
          </Typography>
        </BlockyCard>
      </HeroSection>
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
      <HeroSection>
        <HowToPlay />
      </HeroSection>
    </Stack>
  );
};
