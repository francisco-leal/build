"use client";

import { FunctionComponent } from "react";
import { useTransition } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { toast } from "sonner";
import { BlockyCard } from "@/shared/components/blocky-card";
import { UserShield } from "@/shared/icons/user-shield";
import { formatNumber } from "@/shared/utils/format-number";


export const CardBuilderScore: FunctionComponent<
  BuilderScoreCardComponentProps
> = ({ score = 0, loading, recalculate }) => {
  const [isTransition, transition] = useTransition();

  const recalculateScore = () =>
    transition(() => {
      if (recalculate) recalculate().catch((e) => toast.error(e.message));
    });

  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        Builder Score
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <UserShield />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---.--" : formatNumber(score)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        Your reputation as a builder, as measured by the Talent Passport.
      </Typography>

      <Button
        href={
          "https://passport.talentprotocol.com"
        }
        target="_blank"
        component={Link}
        variant="solid"
        color="primary"
      >
        Talent Passport
      </Button>
    </BlockyCard>
  );
};
