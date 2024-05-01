import { HeroSection } from "@/shared/components/hero-section";
import { Box, Button, Link, Stack, Typography } from "@mui/joy";

export const Section1 = () => {
  return (
    <HeroSection component="section" sx={{ color: "common.white" }}>
      <Typography level="h1" maxWidth={"sm"}>
        The Memecoin
        <br />
        for Builders
      </Typography>

      <Typography level="body-lg" px={{ md: 20 }}>
        $BOSS is an ERC-20 token on Base with a total supply of a
        404,404,404,404. It will be launched on May 2024, with a 7-day crowdfund
        on party.app, followed by a Community Airdrop to onchain builders.
      </Typography>
    </HeroSection>
  );
};
