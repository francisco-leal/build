import { FunctionComponent } from "react";
import { Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { FireNominationStreak } from "@/shared/icons/fire-nomination-streak";

export type DailyStreakCardProps = {
  streak?: number;
  loading?: boolean;
};

export const CardDailyStreak: FunctionComponent<DailyStreakCardProps> = ({
  streak,
  loading,
}) => {
  const isSingular = streak === 1;
  const text = `${streak} day${isSingular ? "" : "s"}`;

  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        Nomination Streak
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <FireNominationStreak />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---" : text}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Consecutive days you nominated someone.
      </Typography>
    </BlockyCard>
  );
};
