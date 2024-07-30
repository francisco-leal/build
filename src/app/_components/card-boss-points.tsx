import { FunctionComponent } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { DateTime } from "luxon";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";
import { formatLargeNumber } from "@/shared/utils/format-number";
import { getCurrentWeek } from "../_api/data/nominations";

export type CardBossPointsProps = {
  points?: number;
  loading?: boolean;
};

export const CardBossPoints: FunctionComponent<CardBossPointsProps> = async ({
  points = 0,
  loading,
}) => {
  const { endOfWeek } = await getCurrentWeek();
  const shortFormat = "LLL dd, hh:mm a 'UTC'";
  const nextUpdate = DateTime.fromISO(endOfWeek).toFormat(shortFormat);
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        BUILD Points
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Dice />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---.--" : formatLargeNumber(points)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Total points earned from nominations received in Round 2, updated every
        Tuesday. Next update on {nextUpdate}.
      </Typography>

      <Button
        href={
          "https://buildcommunity.notion.site/BUILD-FAQ-Round-2-6c8c4ebbfff1452d9123ed74a530cf25"
        }
        target="_blank"
        component={Link}
        variant="solid"
        color="primary"
      >
        How it works
      </Button>
    </BlockyCard>
  );
};
