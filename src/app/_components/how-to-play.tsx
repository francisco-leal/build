"use client";

import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link } from "@mui/joy";
import { Coin } from "@/shared/icons/coin";
import { DroneCameraAirdrop } from "@/shared/icons/drone-camera-airdrop";
import { FingerNominate } from "@/shared/icons/finger-nominate";

export const HowToPlay: FunctionComponent = () => {
  return (
    <>
      <Typography level="h2" sx={{ color: "common.white" }}>
        The BUILD game
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
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <Coin sx={{ fontSize: "64px" }} />
            <Typography level="h3">Budget</Typography>
            <Typography>
              Each player has an individual weekly budget, based on their
              Builder Score and $BUILD tokens. Claim your Talent Passport to
              increase your budget.
            </Typography>

            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="https://passport.talentprotocol.com"
              target="_blank"
              underline="none"
              sx={{ mt: 2 }}
            >
              Talent Passport
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <FingerNominate sx={{ fontSize: "64px" }} />
            <Typography level="h3">Nominations</Typography>

            <Typography>
              Search and nominate builders on Farcaster or Talent Passport.
              Nominations reset every Tuesday and your weekly budget gets
              re-calculated.
            </Typography>

            <Button
              href={"/stats"}
              component={Link}
              variant="solid"
              color="neutral"
              sx={{ mt: 2 }}
            >
              Dashboard
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <DroneCameraAirdrop sx={{ fontSize: "64px" }} />
            <Typography level="h3">Airdrop 1</Typography>

            <Typography>
              BUILD Points will convert into $BUILD tokens, after Round 2 ends.
              $BUILD is 100% community owned. No team or investors allocation.
            </Typography>
            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="/about"
              underline="none"
              sx={{ mt: 2 }}
            >
              About
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
