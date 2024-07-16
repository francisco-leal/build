import { default as Image } from "next/image";
import { Button, Stack } from "@mui/joy";
import { Typography, Box, Link } from "@mui/joy";
import { BackgroundImage } from "@/app/_components/background-image";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { ExternalLink } from "@/shared/icons/external-link";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { default as mobileGraph } from "./_images/bossnomics-graph-mobile.png";
import { default as desktopGraph } from "./_images/bossnomics-graph.png";
import { default as mobileCycle } from "./_images/build-cycle-mobile.png";
import { default as desktopCycle } from "./_images/build-cycle.png";

export default function Tokenomics() {
  return (
    <Stack component="main" sx={{ position: "relative" }}>
      <BackgroundImage />
      <HeroSectionSlim sx={{ mb: 0 }}>
        <Typography level="h1">
          The Memecoin
          <br />
          for Builders
        </Typography>

        <Typography level="title-lg" sx={{ pb: 8 }}>
          $BUILD is a token of appreciation on Base, and a nominations game to
          reward onchain builders with both social and financial capital.
        </Typography>
        <Box
          component={Image}
          src={desktopCycle}
          alt="graph"
          sx={{
            width: "100%",
            height: "auto",
            display: { xs: "none", sm: "block" },
          }}
        />
        <Box
          component={Image}
          src={mobileCycle}
          alt="graph"
          sx={{
            width: "100%",
            height: "auto",
            display: { xs: "block", sm: "none" },
          }}
        />
      </HeroSectionSlim>
      <HeroSection>
        <Typography level="h2" textColor={"common.white"}>
          Tokenomics
        </Typography>

        <Typography level="title-lg" textColor={"common.white"} maxWidth={720}>
          $BUILD is an ERC-20 token on Base with a total supply of a 1T. It
          launched on May 1st 2024, with a crowdfund on party.app. 60% of tokens
          are allocated to the community and ecosystem, and other 40% are
          related with liquidity
        </Typography>

        <Link
          href="https://basescan.org/token/0x3c281a39944a2319aa653d81cfd93ca10983d234"
          level="body-lg"
          target="_blank"
          textColor={"common.white"}
          underline="hover"
        >
          {abbreviateWalletAddress(
            "0x3c281a39944a2319aa653d81cfd93ca10983d234",
          )}
          <ExternalLink sx={{ pl: 1 }} />
        </Link>

        <BlockyCard sx={{ my: 5, width: "100%" }}>
          <Box
            component={Image}
            src={desktopGraph}
            alt="graph"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "none", sm: "block" },
            }}
          />
          <Box
            component={Image}
            src={mobileGraph}
            alt="graph"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "block", sm: "none" },
            }}
          />
        </BlockyCard>
      </HeroSection>
      <HeroSection>
        <Typography level="h2" textColor={"common.white"}>
          By builders, for builders.
        </Typography>

        <Typography level="title-lg" textColor={"common.white"} maxWidth={720}>
          Get to know the stewards team and verify current status of the
          community treasury.
        </Typography>

        <Button
          component={Link}
          href={
            "https://buildcommunity.notion.site/BUILD-Project-Info-7f976b4572f243f38bdf97e42d16316e?pvs=74"
          }
          target="_blank"
          variant="solid"
          color="neutral"
          sx={{ mt: 2 }}
        >
          Project Info
        </Button>
      </HeroSection>
    </Stack>
  );
}
