import { HeroSection } from "@/shared/components/hero-section";
import { Box, Button, Link, Stack, Typography } from "@mui/joy";

export const Section1 = () => {
  return (
    <HeroSection component="section" sx={{ color: "common.white" }}>
      <Typography level="h1" maxWidth={"sm"}>
        The Memecoin for Builders
      </Typography>

      <Typography level="body-lg" px={{ md: 20 }}>
        $BUILD is an ERC-20 token on Base with a total supply of a
        1,000,000,000,000. It will be launched on May 2024, with a crowdfund on
        party.app, followed by a Community Airdrop to onchain builders.
      </Typography>
    </HeroSection>
  );
};
