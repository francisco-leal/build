"use client";

import { FunctionComponent } from "react";
import { Typography, Stack, Button, Link } from "@mui/joy";
import { useShareLink } from "@/app/_hooks/useShareLink";
import { Coin } from "@/shared/icons/coin";
import { DroneCameraAirdrop } from "@/shared/icons/drone-camera-airdrop";
import { FingerNominate } from "@/shared/icons/finger-nominate";

export const HowToPlay: FunctionComponent = () => {
  const [shareLink, onShareLink] = useShareLink();

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
              Each player has an individual daily budget, based on their Builder
              Score. Claim your Talent Passport to increase your score and
              budget.
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
              Search username or share your link to nominate up to 3
              builders/day. Each nomination receives 90% of your Daily Budget,
              you earn 10%.
            </Typography>

            <Button
              href={shareLink ?? "/"}
              component={Link}
              disabled={!shareLink}
              variant="solid"
              color="neutral"
              sx={{ mt: 2 }}
              onClick={onShareLink}
            >
              Share Link
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{ height: "100%", flex: 1, p: 5, gap: 5, alignItems: "center" }}
        >
          <Stack sx={{ alignItems: "center", gap: 1, color: "common.white" }}>
            <DroneCameraAirdrop sx={{ fontSize: "64px" }} />
            <Typography level="h3">Airdrop</Typography>

            <Typography>
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
