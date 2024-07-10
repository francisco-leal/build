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
          $BUILD is an ERC-20 token on Base with a total supply of a 1T. It
          launched on May 2024, with a crowdfund on party.app, followed by
          community airdrops to onchain builders.
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
          60% of tokens are intended for the community and ecosystem. The other
          40% are related with the initial liquidity pool on Uniswap and
          liquidity mining rewards.
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
          Governance
        </Typography>

        <Typography level="title-lg" textColor={"common.white"} maxWidth={720}>
          Description
        </Typography>

        <Link
          href="https://example.com"
          level="body-lg"
          target="_blank"
          textColor={"common.white"}
          underline="hover"
        >
          Link
          <ExternalLink sx={{ pl: 1 }} />
        </Link>

        <Button
          component={Link}
          href={"https://example.com"}
          target="_blank"
          variant="solid"
          color="neutral"
          sx={{ mt: 2 }}
        >
          See More
        </Button>
      </HeroSection>
    </Stack>
  );
}
