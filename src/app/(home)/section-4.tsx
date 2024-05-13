import { HeroSection } from "@/shared/components/hero-section";
import { Coin, UserShield } from "@/shared/icons";
import { Typography, Button, Box, Link, Table, Stack } from "@mui/joy";

export const Section4 = () => {
  return (
    <HeroSection sx={{ color: "common.white" }}>
      <Typography level="h2">Enter the BUILD game</Typography>

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
            the game starts.
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
            We raised +72 ETH on party.app to launch the $BUILD token together
            and create an LP on Uniswap! More info in{" "}
            <Link
              href="/bossnomics"
              sx={{ color: "common.white", textDecoration: "underline" }}
            >
              Tokenomics
            </Link>
            .
          </Typography>

          <Button
            variant="solid"
            color="neutral"
            component={Link}
            href="https://app.uniswap.org/explore/tokens/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
            underline="none"
            sx={{ mt: "auto" }}
            target="_blank"
          >
            Buy on Uniswap
          </Button>
        </Stack>
      </Stack>
    </HeroSection>
  );
};
