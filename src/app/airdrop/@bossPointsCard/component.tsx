import { BlockyCard } from "@/shared/components/blocky-card";
import { EyeDailyBudget } from "@/shared/icons";
import { Button, Stack, Typography } from "@mui/joy";
import { FunctionComponent } from "react";

export type BossPointsCardComponentProps = {
  points: React.ReactNode;
};

export const BossPointsCardComponent: FunctionComponent<
  BossPointsCardComponentProps
> = ({ points }) => {
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        BOSS Points
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <EyeDailyBudget />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {points}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Total BOSS points earned from nominations received and made.
      </Typography>

      <Button disabled>How it works</Button>
    </BlockyCard>
  );
};
