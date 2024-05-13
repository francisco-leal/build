import { Box, Button, Link, Stack, Typography } from "@mui/joy";
import { Interface, MusicHeadeset } from "@/shared/icons";

export const Section1 = () => (
  <Stack
    component="section"
    sx={{
      pt: { xs: 10, lg: 14 },
      pb: 10,
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    }}
  >
    <Box
      sx={{
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        backgroundImage: { lg: "url(/images/homepage.png)" },
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        zIndex: -1,
      }}
    />
    <Stack
      sx={{
        maxWidth: "md",
        px: 2,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "common.white",
      }}
    >
      <Typography level="h1">
        Nominate <Interface /> the best
        <br />
        builders <MusicHeadeset /> you know.
      </Typography>

      <Typography level="body-lg" sx={{ maxWidth: "sm" }}>
        Celebrate the unsung heroes of the blockchain. Find undervalued
        builders, play the nomination game, and earn BUILD points.
      </Typography>

      <Stack direction={{ xs: "column-reverse", sm: "row" }} gap={2} pt={5}>
        <Button
          variant="outlined"
          component={Link}
          href="https://warpcast.com/~/channel/build"
          underline="none"
          target="_blank"
        >
          Follow on Farcaster
        </Button>

        <Button
          variant="solid"
          color="neutral"
          component={Link}
          target="_blank"
          underline="none"
          href="https://app.uniswap.org/explore/tokens/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
        >
          Buy on Uniswap
        </Button>
      </Stack>
    </Stack>
  </Stack>
);
