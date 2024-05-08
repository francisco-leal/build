import { Typography, Stack, Button, Link } from "@mui/joy";
import { FingerNominate, Coin, DroneCameraAirdrop } from "@/shared/icons";

export default async function HowToPlay() {
  return (
    <>
      <Typography
        sx={{ color: "common.white", fontSize: "40px", fontWeight: "bold" }}
      >
        Enter the BUILD game
      </Typography>

      <Stack
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 3,
        }}
      >
        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <FingerNominate sx={{ color: "common.white", fontSize: "64px" }} />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Nominations
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Search username or share your link to nominate up to 3
              builders/day. Each nomination receives 90% of your Daily Budget,
              you earn 10%.
            </Typography>

            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="https://passport.talentprotocol.com"
              underline="none"
              sx={{ mt: "auto" }}
            >
              Talent Passport
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <Coin sx={{ color: "common.white", fontSize: "64px" }} />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Budget
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              Each player has an individual daily budget, based on their Builder
              Score. Claim your Talent Passport to increase your score and
              budget.
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

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1 }}>
            <DroneCameraAirdrop
              sx={{ color: "common.white", fontSize: "64px" }}
            />
            <Typography
              sx={{
                color: "common.white",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Airdrop
            </Typography>

            <Typography
              sx={{
                color: "common.white",
                fontSize: "16px",
                textAlign: "center",
              }}
            >
              BUILD Points convert into $BUILD tokens, after Airdrop 1 ends in
              June. $BUILD is 100% community owned. No team or investors
              allocation.
            </Typography>
            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="/tokenomics"
              underline="none"
              sx={{ mt: "auto" }}
            >
              Tokenomics
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
