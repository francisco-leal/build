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
        Read the{" "}
        <Link
          href="/memo"
          sx={{ color: "common.white", textDecoration: "underline" }}
        >
          memo
        </Link>
        : there&apos;s no room for builders in the corporate world! Stand for
        builders, play the nomination game, and earn $BOSS. Nominations start on
        May 8th.
      </Typography>

      <Stack direction={{ xs: "column-reverse", sm: "row" }} gap={2} pt={5}>
        <Button
          variant="outlined"
          component={Link}
          href="/memo"
          underline="none"
        >
          Read BOSS Memo
        </Button>

        <Button
          variant="solid"
          color="neutral"
          component={Link}
          target="_blank"
          underline="none"
          href="https://base.party.app/party/0x04483a3F6435bB96c9dcD3C1eDAF4482f7367bA5"
        >
          Join Party
        </Button>
      </Stack>
    </Stack>
  </Stack>
);
