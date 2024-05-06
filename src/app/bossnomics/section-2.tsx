import Image from "next/image";
import { Typography, Box, Link } from "@mui/joy";
import { HeroSection } from "@/shared/components/hero-section";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { ExternalLink } from "@/shared/icons";
import { BlockyCard } from "@/shared/components/blocky-card";

import DESKTOP_GRAPH from "./_images/bossnomics-graph.png";
import MOBILE_GRAPH from "./_images/bossnomics-graph-mobile.png";

export const Section2 = () => {
  return (
    <HeroSection>
      <Typography level="h2" textColor={"common.white"}>
        Tokenomics
      </Typography>

      <Typography level="title-lg" textColor={"common.white"} maxWidth={720}>
        60% of tokens are intended for the community and ecosystem. The other
        40% are related with the initial liquidity pool on Uniswap and liquidity
        mining rewards.
      </Typography>

      <Link
        href="#"
        level="body-lg"
        textColor={"common.white"}
        underline="hover"
      >
        {abbreviateWalletAddress(
          "0xf4ecthisisaplceholderThatdoesnotshowupeEc64F",
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
  );
};
