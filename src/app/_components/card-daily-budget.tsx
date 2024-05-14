import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";
import { formatNumber } from "@/shared/utils/format-number";

export type DailyBudgetCardProps = {
  budget?: number;
  loading?: boolean;
};

export const CardDailyBudget: FunctionComponent<DailyBudgetCardProps> = ({
  budget = 0,
  loading,
}) => {
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
        Recalculated daily at 3:00pm UTC, based on Points earned, Builder Score,
        and Streak. Read more in{" "}
        <Link
          href="https://buildcommunity.notion.site/BUILD-FAQ-51bd011214534fa596f15632ef788b10?pvs=4"
          target="_blank"
          textColor="neutral.500"
          sx={{ textDecoration: "underline" }}
        >
          FAQ
        </Link>
        .
      </Typography>
    </BlockyCard>
  );
};
