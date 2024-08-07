import { FunctionComponent } from "react";
import { Stack, Typography, Button, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { FireNominationStreak } from "@/shared/icons/fire-nomination-streak";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type DailyStreakCardProps = {
  buildCommitted?: number;
  loading?: boolean;
};

export const CardBuildCommitted: FunctionComponent<DailyStreakCardProps> = ({
  buildCommitted,
  loading,
}) => {
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        Build Committed
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <FireNominationStreak />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---" : formatLargeNumber(buildCommitted ?? 0)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Amount of $BUILD tokens committed, from the Round 1 allocation.
      </Typography>
      <Button component={Link} href="/airdrop1">
        Round 1 Stats
      </Button>
    </BlockyCard>
  );
};
