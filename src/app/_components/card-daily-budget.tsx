"use client";

import { FunctionComponent } from "react";
import { useTransition } from "react";
import { Stack, Typography, Button } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";
import { formatNumber } from "@/shared/utils/format-number";

export type DailyBudgetCardProps = {
  budget?: number;
  loading?: boolean;
  recalculate?: () => Promise<number>;
};

export const CardDailyBudget: FunctionComponent<DailyBudgetCardProps> = ({
  budget = 0,
  loading,
  recalculate,
}) => {
  const [isTransition, transition] = useTransition();

  const recalculateBudget = () =>
    transition(() => {
      if (recalculate) recalculate();
    });

  return (
    <BlockyCard id="daily-budget">
      <Typography level="body-lg" component="h4" textColor="primary.500">
        Daily Budget
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Dice />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---" : formatNumber(budget)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Recalculated daily at <strong>00:00 UTC</strong>, based on Points
        earned, Builder Score, $BUILD Tokens and Streak.
      </Typography>

      {recalculate && budget === 0 && (
        <Button loading={isTransition} onClick={() => recalculateBudget()}>
          Get a budget
        </Button>
      )}
    </BlockyCard>
  );
};
