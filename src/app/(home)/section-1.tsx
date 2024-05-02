import {
  Box,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { Interface, MusicHeadeset } from "@/shared/icons";
import { Section1Nominations } from "./section-1-nominations";

export const Section1 = () => (
  <Stack
    component="section"
    sx={{
      pt: { xs: 10, lg: 14 },
      pb: 2,
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
        gap: 2,
      }}
    >
      <Typography level="h1">
        Nominate <Interface /> the best
        <br />
        builders <MusicHeadeset /> you know.
      </Typography>

      <Typography level="title-lg" sx={{ maxWidth: "sm" }}>
        Read the{" "}
        <Link
          href="/memo"
          sx={{ color: "common.white", textDecoration: "underline" }}
        >
          memo
        </Link>
        : there&apos;s no room for builders in the corporate world! Stand for
        builders, play the nomination game, and earn $BOSS. Nominations start
        on May 8th.
      </Typography>

      <Section1Nominations sx={{ alignItems: "center", width: "100%", height: 280 }} />
    </Stack>
  </Stack>
);
