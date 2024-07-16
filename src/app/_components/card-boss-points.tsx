import { FunctionComponent } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type CardBossPointsProps = {
  points?: number;
  loading?: boolean;
};

export const CardBossPoints: FunctionComponent<CardBossPointsProps> = ({
  points = 0,
  loading,
}) => {
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
        Total BUILD points earned from nominations received.
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
