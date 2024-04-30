import { HeroSection } from "@/shared/components/hero-section";
import { Coin, UserShield } from "@/shared/icons";
import { Typography, Button, Box, Link, Table, Stack } from "@mui/joy";

export const Section4 = () => {
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
          <Coin sx={{ width: 48, height: 48, color: "common.white" }} />

          <Typography level="h3">Step 2</Typography>

          <Typography>
            Join on party.app until May 7th, to help us raise LP funds and
            launch the $BOSS token together! More info in{" "}
            <Link
              href="/bossnomics"
              sx={{ color: "common.white", textDecoration: "underline" }}
            >
              Bossnomics
            </Link>
            .
          </Typography>

          <Button
            variant="solid"
            color="neutral"
            component={Link}
            href="https://base.party.app/party/0x04483a3F6435bB96c9dcD3C1eDAF4482f7367bA5"
            underline="none"
            sx={{ mt: "auto" }}
          >
            Join Party
          </Button>
        </Stack>
      </Stack>
    </HeroSection>
  );
};
