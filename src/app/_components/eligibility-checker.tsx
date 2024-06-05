"use client";

import { useTransition, useState } from "react";
import { Button, Typography, Stack } from "@mui/joy";
import { toast } from "sonner";
import { BlockyCard } from "@/shared/components/blocky-card";
import { EligibilityState } from "../_api/functions/calculate-eligibility";

type Props = {
  calculateEligibility?: () => Promise<EligibilityState>;
};

export const EligibilityChecker = ({ calculateEligibility }: Props) => {
  const [isTransition, transition] = useTransition();
  const [eligibilityState, setEligibilityState] =
    useState<EligibilityState | null>();

  const calculateTransition = () =>
    transition(() => {
      if (calculateEligibility)
        calculateEligibility()
          .then((result) => setEligibilityState(result))
          .catch((e) => toast.error(e.message));
    });

  return (
    <Stack sx={{ flexDirection: "column", alignItems: "center" }}>
      <BlockyCard>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography level="body-md" sx={{ pt: 2 }}>
            Farcaster ID prior to May 15th
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState
              ? eligibilityState.farcasterResult
              : isTransition
                ? "⏳"
                : "❓"}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography level="body-md" sx={{ pt: 2 }}>
            ENS domain prior to May 15th
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState
              ? eligibilityState.ensResult
              : isTransition
                ? "⏳"
                : "❓"}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography level="body-md" sx={{ pt: 2 }}>
            Proof of Humanity on Talent Passport
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState
              ? eligibilityState.credentialsResult
              : isTransition
                ? "⏳"
                : "❓"}
          </Typography>
        </Stack>
        {!eligibilityState && (
          <Button
            onClick={() => calculateTransition()}
            variant="solid"
            color="primary"
            sx={{
              mt: 2,
              "& svg": {
                color: "primary.500",
                width: 20,
                height: 20,
              },
            }}
            loading={isTransition}
          >
            Check eligiblity
          </Button>
        )}
        {eligibilityState?.isEligible && (
          <Typography level="body-lg" sx={{ py: 2 }}>
            <strong>You are eligible</strong> for Airdrop 1 🎉 <br></br>Claiming
            period starts June 11th.
          </Typography>
        )}
        {eligibilityState?.isEligible === false && (
          <Typography level="body-lg" sx={{ py: 2 }}>
            <strong>You are not eligible</strong> for Airdrop 1 😔
            {eligibilityState.nominationsMade === 0 && (
              <>
                <br></br>You didn't nominate anyone.
              </>
            )}
          </Typography>
        )}
      </BlockyCard>
    </Stack>
  );
};
