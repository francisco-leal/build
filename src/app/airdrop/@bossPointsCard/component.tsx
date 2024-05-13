import { FunctionComponent } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Dice } from "@/shared/icons/dice";

export type BossPointsCardComponentProps = {
  points: React.ReactNode;
};

export const BossPointsCardComponent: FunctionComponent<
  BossPointsCardComponentProps
> = ({ points }) => {
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
          {points}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Total BUILD points earned from nominations received and made.
      </Typography>

      <Button
        href={
          "https://bosscommunity.notion.site/BOSS-FAQ-0a7dabb972e1442382f2cf0dad00ed4e?pvs=4"
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
