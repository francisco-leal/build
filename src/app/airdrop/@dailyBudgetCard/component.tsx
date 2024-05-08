import { BlockyCard } from "@/shared/components/blocky-card";
import { EyeDailyBudget } from "@/shared/icons";
import { Link, Stack, Typography } from "@mui/joy";
import { FunctionComponent } from "react";

export type DailyBudgetCardProps = {
  budget: React.ReactNode;
};

export const DailyBudgetCardComponent: FunctionComponent<
  DailyBudgetCardProps
> = ({ budget }) => {
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        Daily Budget
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <EyeDailyBudget />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {budget}
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
