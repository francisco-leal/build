import { Typography } from "@mui/joy";
import { HeroSectionSlim } from "@/shared/components/hero-section-slim";

export const Section1 = () => {
  return (
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
  );
};
