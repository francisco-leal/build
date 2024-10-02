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
        How BUILD Works
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
            <Typography level="h3">Universal Builder Income</Typography>
            <Typography>
              BUILD is working on a UBI experiment to provide sustainable,
              recurring, and permissionless support to new onchain builders.
            </Typography>

            <Button
              variant="solid"
              color="neutral"
              component={Link}
              href="https://paragraph.xyz/@macedo/build-log-10"
              target="_blank"
              underline="none"
              sx={{ mt: 2 }}
            >
              Read More
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
              Cast "nominate" and username in /build on Farcaster to gift $BUILD
              tokens. Casts liked by curators will share the weekly reward pool.
            </Typography>

            <Button
              href="https://rounds.wtf/build"
              component={Link}
              variant="solid"
              color="neutral"
              sx={{ mt: 2 }}
            >
              rounds.wtf
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <DroneCameraAirdrop sx={{ fontSize: "64px" }} />
            <Typography level="h3">Airdrops</Typography>

            <Typography>
              Airdrop 1 distributed 150B $BUILD tokens to 90K+ onchain builders.
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
              Tokenomics
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
