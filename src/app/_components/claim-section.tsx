"use client";

import { useTransition, useState, useEffect } from "react";
import { Button, Typography, Stack, Divider } from "@mui/joy";
import { toast } from "sonner";
import { BlockyCard } from "@/shared/components/blocky-card";
import { LogoShort } from "@/shared/icons/logo-short";
import { formatLargeNumber, formatNumber } from "@/shared/utils/format-number";
import { AirdropInfo } from "../_api/data/users";

type Props = {
  details: AirdropInfo | null;
};

export const ClaimSection = ({ details }: Props) => {
  const [showClaimFlow, setShowClaimFlow] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    if (!showClaimFlow) {
      setStep(0);
    }
  }, [showClaimFlow]);

  return (
    <>
      {!showClaimFlow && (
        <Button
          variant="solid"
          color="neutral"
          onClick={() => setShowClaimFlow(true)}
          sx={{ mt: 2 }}
        >
          Claim $BUILD
        </Button>
      )}
      {showClaimFlow && !!details && step === 0 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="h3" sx={{ mt: 0 }}>
                Are you a Builder or a Quitter?
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                Airdrop 1 was a successful and fun first experiment, but BUILD
                still has so much room to grow. Now, we as a community, have a
                choice: we either commit or quit.
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                We can commit to grow BUILD into an onchain builder economy that
                rewards builders with both social and financial capital. 🫡
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                Or we can all claim our $BUILD tokens and kill this experiment.
                🪦
              </Typography>
              <Typography level="body-md" sx={{ textAlign: "start" }}>
                If we reach 75B $BUILD committed (50% of Airdrop 1) by the end
                of June, the team will continue building during Onchain Summer
                and launch Airdrop 2 in September. Read more about the future of
                BUILD here.
              </Typography>
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setShowClaimFlow(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setStep(1)}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {showClaimFlow && !!details && step === 1 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                Total $BUILD Tokens
              </Typography>
              <Typography
                level="h2"
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mt: 0,
                }}
              >
                <LogoShort sx={{ "&&": { height: 40, width: 40 } }} />{" "}
                {formatLargeNumber(details.build_points ?? 0)}
              </Typography>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="title-sm">Allocation</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Total Build points</Typography>
                <Typography level="body-sm">
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">Allocation multiplier</Typography>
                <Typography level="body-sm">10x (Verified Builder)</Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg">$BUILD Allocation</Typography>
                <Typography level="title-lg">
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  minWidth: "100%",
                }}
              >
                <Typography level="title-lg" textColor={"primary.500"}>
                  $BUILD Allocation x 10
                </Typography>
                <Typography level="title-lg" textColor={"primary.500"}>
                  {formatNumber(details.build_points ?? 0)}
                </Typography>
              </Stack>
              <Divider sx={{ backgroundColor: "neutral.400" }} />
              <Typography level="body-sm" sx={{ textAlign: "start" }}>
                Builder or not, all eligible users are able to claim tokens. But
                we reward verifiable builders and token holders with an airdrop
                allocation multiplier.
              </Typography>
              <Stack
                sx={{
                  alignSelf: "end",
                  display: "flex",
                  flexDirection: "row",
                  mt: 2,
                }}
              >
                <Button
                  variant="outlined"
                  color="neutral"
                  onClick={() => setShowClaimFlow(false)}
                  sx={{ mr: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </Stack>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {showClaimFlow && !!details && step === 2 && (
        <Stack
          sx={{
            flexDirection: "column",
            mt: 4,
            maxWidth: "600px",
          }}
        >
          <BlockyCard>
            <Stack
              sx={{
                flexDirection: "column",
                alignItems: "start",
                minWidth: "400px",
                gap: 1,
              }}
            >
              <Typography level="body-lg" sx={{ alignSelf: "center" }}>
                Total $BUILD Tokens
              </Typography>
              <Typography
                level="h2"
                sx={{
                  alignSelf: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  marginTop: 0,
                }}
              >
                <LogoShort sx={{ "&&": { height: 40, width: 40 } }} />{" "}
                {formatLargeNumber(details.build_points ?? 0)}
              </Typography>
              <Divider sx={{ backgroundColor: "neutral.400", my: 2 }} />
              <Typography level="title-md">Pay It All Forward</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Commit 100% of your tokens to the BUILD Summer Fund.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  BUILD Budget for future airdrops based on tokens committed.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Participate in BUILD governance decisions (coming soon).
                </Typography>
              </Stack>
              <Button
                variant="solid"
                color="primary"
                onClick={() => setShowClaimFlow(false)}
                sx={{ alignSelf: "center", mt: 2 }}
              >
                Commit 100%
              </Button>
              <Divider sx={{ backgroundColor: "neutral.400", my: 2 }} />
              <Typography level="title-md">Split & Commit Half</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Commit 50% of your tokens to the BUILD Summer Fund.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Claim $BUILD tokens now, with multiplier.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Featured in a new leaderboard, ranked by tokens committed.
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ borderColor: "neutral.500", alignSelf: "center", mt: 2 }}
              >
                Commit 50%
              </Button>
              <Divider sx={{ backgroundColor: "neutral.400", my: 2 }} />
              <Typography level="title-md">Claim & Quit</Typography>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Allocation multiplier will not be considered.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  Claim tokens only on June 18th.
                </Typography>
              </Stack>
              <Stack
                sx={{
                  flexDirection: "row",
                  gap: 1,
                  minWidth: "100%",
                }}
              >
                <Typography level="body-sm">✅</Typography>
                <Typography level="body-sm">
                  No BUILD budget for the next airdrops.
                </Typography>
              </Stack>
              <Button
                variant="outlined"
                color="neutral"
                disabled={true}
                sx={{ alignSelf: "center", mt: 2 }}
              >
                Claim on Jun 18
              </Button>
            </Stack>
          </BlockyCard>
        </Stack>
      )}
      {showClaimFlow && !details && (
        <Stack
          sx={{
            flexDirection: "column",
          }}
        >
          <Typography level="body-md" sx={{ pt: 2 }}>
            You are not eligible for the airdrop.
          </Typography>
        </Stack>
      )}
    </>
  );
};
