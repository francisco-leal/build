"use client";

import { FunctionComponent } from "react";
import { Stack, Typography, Button, Link } from "@mui/joy";
import { parseEther, parseUnits } from "viem";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type DailyBudgetCardProps = {
  amount: string | undefined;
};

export const CardDailyBudget: FunctionComponent<DailyBudgetCardProps> = ({
  amount,
}) => {
  const amountToDisplay = Number(amount ?? "0") / 10 ** 18;

  return (
    <BlockyCard id="daily-budget">
      <Typography level="body-lg" component="h4" textColor="primary.500">
        Round 2 Allocation
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Coin />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {amountToDisplay > 0 ? formatLargeNumber(amountToDisplay) : "--,-"}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Claim until Sep 30th. You needed to have the{" "}
        <Link
          href="https://docs.talentprotocol.com/docs/protocol-overview/talent-passport/human-checkmark"
          target="_blank"
          underline="always"
          sx={{ textDecoration: "underline" }}
        >
          Human Checkmark
        </Link>{" "}
        on your Talent Passport before Aug 27th to be eligible.
      </Typography>
      <Button component={Link} href="/airdrop1">
        Claim
      </Button>
    </BlockyCard>
  );
};
