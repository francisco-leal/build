"use client";

import { useTransition, useState } from "react";
import { Button, Typography, Stack } from "@mui/joy";
import { toast } from "sonner";
import { EligibilityState } from "../_api/functions/calculate-eligibility";
import { BlockyCard } from "@/shared/components/blocky-card";

type Props = {
  calculateEligibility?: () => Promise<EligibilityState>;
};

export const EligibilityChecker = ({ calculateEligibility }: Props) => {
  const [isTransition, transition] = useTransition();
  const [eligibilityState, setEligibilityState] = useState<EligibilityState | null>()

  const calculateTransition = () =>
    transition(() => {
      if (calculateEligibility)
        calculateEligibility()
          .then((result) => setEligibilityState(result))
          .catch((e) => toast.error(e.message));
    });

  return (
    <Stack sx={{ flexDirection: "column", alignItems: "center" }}>
    {eligibilityState?.isEligible && (
        <Typography level="body-lg" sx={{ pb: 2 }} textColor={"common.white"}>
          You are eligible for the airdrop!
        </Typography>
      )}
      {eligibilityState?.isEligible === false && (
        <Typography level="body-lg" sx={{ pb: 2 }} textColor={"common.white"}>
          You are not eligible for the airdrop.
        </Typography>
      )}
      <BlockyCard>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography
            level="body-md"
            sx={{ pt: 2 }}
          >
            Farcaster eligibility
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState ? eligibilityState.farcasterResult : isTransition ? "⏳" : "❓"}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography
            level="body-md"
            sx={{ pt: 2 }}
          >
            ENS eligibility
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState ? eligibilityState.ensResult : isTransition ? "⏳" : "❓"}
          </Typography>
        </Stack>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            minWidth: "400px",
          }}
        >
          <Typography
            level="body-md"
            sx={{ pt: 2 }}
          >
            Talent Passport eligibility
          </Typography>
          <Typography level="body-md" sx={{ pt: 2 }}>
            {eligibilityState ? eligibilityState.credentialsResult : isTransition ? "⏳" : "❓"}
          </Typography>
        </Stack>
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
      </BlockyCard>
    </Stack>
  );
};
