import { HeroSectionSlim } from "@/shared/components/hero-section-slim";
import { Typography } from "@mui/joy";

export const Section1 = () => {
  return (
    <HeroSectionSlim sx={{ color: "common.white" }}>
      <Typography level="h1">
        The Memecoin
        <br />
        for Builders
      </Typography>

      <Typography level="title-lg">
        $BOSS is an ERC-20 token on Base with a total supply of a
        404,404,404,404. It will be launched on May 2024, with a 7-day crowdfund
        on party.app, followed by a Community Airdrop to onchain builders.
      </Typography>
    </HeroSectionSlim>
  );
};
