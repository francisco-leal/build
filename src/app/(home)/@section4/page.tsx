import { HeroSection } from "@/shared/components/hero-section";
import { UserManLove, UserShield } from "@/shared/icons";
import { Typography, Button, Link, Stack } from "@mui/joy";

export default function Section4() {
  return (
    <HeroSection sx={{ color: "common.white" }}>
      <Typography level="h2">Become a BOSS</Typography>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Stack
          sx={{
            height: "100%",
            flex: 1,
            alignItems: "center",
            minHeight: 320,
            py: 5,
          }}
        >
          <UserShield sx={{ width: 48, height: 48, color: "common.white" }} />

          <Typography level="h3">Step 1</Typography>

          <Typography>
            Claim your Talent Passport, and increase your Builder Score before
            the first snapshot, on May 7th at 17:59 UTC.
          </Typography>

          <Button
            variant="solid"
            color="neutral"
            component={Link}
            href="https://passport.talentprotocol.com"
            underline="none"
            sx={{ mt: "auto" }}
          >
            Claim Talent Passport
          </Button>
        </Stack>

        <Stack
          sx={{
            height: "100%",
            flex: 1,
            alignItems: "center",
            minHeight: 320,
            py: 5,
          }}
        >
          <UserManLove sx={{ width: 48, height: 48, color: "common.white" }} />

          <Typography level="h3">Step 2</Typography>

          <Typography>
            Nominate the best builders you know by searching for their web3
            username or by sending them your personal link.
          </Typography>

          <Button
            variant="solid"
            color="neutral"
            component={Link}
            href="/"
            underline="none"
            sx={{ mt: "auto" }}
          >
            Share Link
          </Button>
        </Stack>
      </Stack>
    </HeroSection>
  );
}
