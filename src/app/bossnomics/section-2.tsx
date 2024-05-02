import { Sheet, Typography, Box } from "@mui/joy";
import DESKTOP_GRAPH from "../../../public/images/bossnomics-graph.png";
import MOBILE_GRAPH from "../../../public/images/bossnomics-graph-mobile.png";
import Image from "next/image";
import { HeroSection } from "@/shared/components/hero-section";

export const Section2 = () => {
  return (
    <HeroSection>
      <Typography level="h2" textColor={"common.white"}>
        Tokenomics
      </Typography>

      <Typography level="body-lg" textColor={"common.white"}>
        60% of tokens are intended for the community and ecosystem. The other
        40% are related with the initial liquidity pool on Uniswap and liquidity
        mining rewards.
      </Typography>

      {/* <Typography sx={{ color: 'common.white', fontSize: '18px', textAlign: 'center' }}>
                0xf4ec...eEc64F
            </Typography> */}

      <Sheet
        variant="outlined"
        sx={{ width: "100%", py: { xs: 5, md: 5 }, px: { xs: 5, md: 20 } }}
      >
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
      </Sheet>
    </HeroSection>
  );
};
