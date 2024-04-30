import { Sheet, Typography } from "@mui/joy";
import { Eye, Terminal } from "@/shared/icons";
import { HeroSection } from "@/shared/components/hero-section";

export const Section2 = () => {
  return (
    <HeroSection sx={{ flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
      <Sheet
        variant="outlined"
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          py: 5,
          px: 2,
          minHeight: 280,
        }}
      >
        <Eye sx={{ width: 48, height: 48 }} color="primary" />
        <Typography level="h3" textColor="common.black">
          What is BOSS?
        </Typography>
        <Typography textColor="neutral.500">
          BOSS is a meme, a token of appreciation and a social game designed to
          reward builders via onchain nominations.
        </Typography>
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          height: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 5,
          px: 2,
          minHeight: 280,
        }}
      >
        <Terminal sx={{ width: 48, height: 48 }} color="primary" />
        <Typography level="h3" textColor="common.black">
          How BOSS works?
        </Typography>
        <Typography textColor="neutral.500">
          Players have a daily budget of BOSS points to donate to 3 builders a
          day. Points will convert to $BOSS tokens in June.
        </Typography>
      </Sheet>
    </HeroSection>
  );
};
