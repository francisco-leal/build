"use client";

import { FunctionComponent } from "react";
import { useTransition } from "react";
import { Stack, Typography, Button, Link } from "@mui/joy";
import { DateTime } from "luxon";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";
import { formatNumber } from "@/shared/utils/format-number";

export type DailyBudgetCardProps = {
  budget?: number;
  loading?: boolean;
  lastCalculation: string | null;
  recalculate?: () => Promise<number>;
};

export const CardDailyBudget: FunctionComponent<DailyBudgetCardProps> = ({
  budget = 0,
  loading,
  recalculate,
  lastCalculation,
}) => {
  const shouldLetRecalculate =
    DateTime.now()
      .diff(DateTime.fromISO(lastCalculation ?? ""))
      .as("days") >= 1;
  const [isTransition, transition] = useTransition();

  const recalculateBudget = () =>
    transition(() => {
      if (recalculate) recalculate();
    });

  return (
    <BlockyCard id="daily-budget">
      <Typography level="body-lg" component="h4" textColor="primary.500">
        Weekly Budget
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
        Recalculated weekly on Mondays, based on Builder Score, $BUILD Commited
        and $BUILD held.
      </Typography>

      {shouldLetRecalculate && (
        <Button
          onClick={() => recalculateBudget()}
          loading={isTransition}
          target="_blank"
        >
          {loading && ""}
          {!loading && budget > 0 ? "Recalculate budget" : "Calculate budget"}
        </Button>
      )}
    </BlockyCard>
  );
};
