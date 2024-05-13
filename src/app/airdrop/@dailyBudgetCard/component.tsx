import { FunctionComponent } from "react";
import { Link, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { EyeDailyBudget } from "@/shared/icons/eye-daily-budget";
import { formatNumber } from "@/shared/utils/format-number";

export type DailyBudgetCardProps = {
  budget?: number;
  loading?: boolean;
};

export const DailyBudgetCardComponent: FunctionComponent<
  DailyBudgetCardProps
> = ({ budget, loading }) => {
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500" id="#daily_budget">
        Daily Budget
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <EyeDailyBudget />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---" : formatNumber(budget ?? 0)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Recalculated daily at 00:00 UTC, based on Points earned, Builder Score,
        and Streak. Read more in{" "}
        <Link
          href="https://bosscommunity.notion.site/BOSS-FAQ-0a7dabb972e1442382f2cf0dad00ed4e?pvs=4"
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

export const DailyBudgetCardLoading = () => (
  <DailyBudgetCardComponent loading />
);
