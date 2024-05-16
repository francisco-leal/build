import { default as Image } from "next/image";
import { Stack } from "@mui/joy";
import { Typography, Box, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { HeroSection } from "@/shared/components/hero-section";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { ExternalLink } from "@/shared/icons/external-link";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import MOBILE_GRAPH from "./_images/bossnomics-graph-mobile.png";
import DESKTOP_GRAPH from "./_images/bossnomics-graph.png";

const grantsData = [
  {
    id: "1",
    description: "Waiting for proposals",
    status: "Vesting",
    supplyPercentage: 0,
  },
];

export default function Tokenomics() {
  return (
    <Stack component="main" sx={{ alignItems: "center" }}>
      <HeroSectionSlim sx={{ color: "common.white" }}>
        <Typography level="h1">
          The Memecoin
          <br />
          for Builders
        </Typography>

        <Typography level="title-lg">
          $BUILD is an ERC-20 token on Base with a total supply of a 1T. It
          launched on May 2024, with a crowdfund on party.app, followed by
          community airdrops to onchain builders.
        </Typography>
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
            src={DESKTOP_GRAPH}
            alt="graph"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "none", sm: "block" },
            }}
          />
          <Box
            component={Image}
            src={MOBILE_GRAPH}
            alt="graph"
            sx={{
              width: "100%",
              height: "auto",
              display: { xs: "block", sm: "none" },
            }}
          />
        </BlockyCard>
      </HeroSection>
    </Stack>
  );
}
