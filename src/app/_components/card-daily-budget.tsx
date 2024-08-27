"use client";

import { FunctionComponent } from "react";
import { Stack, Typography, Button, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";

export type DailyBudgetCardProps = {};

export const CardDailyBudget: FunctionComponent<
  DailyBudgetCardProps
> = ({}) => {
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
          {"--,-"}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Tokens will be available to claim from Aug 29th until Sep 30th, after we
        run an anti-bot algorithm to convert BUILD points to $BUILD tokens.
      </Typography>
      <Button component={Link} href="/airdrop1">
        Claim
      </Button>
    </BlockyCard>
  );
};
