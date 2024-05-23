"use client";

import { FunctionComponent } from "react";
import { useTransition } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { UserShield } from "@/shared/icons/user-shield";
import { formatNumber } from "@/shared/utils/format-number";

export type BuilderScoreCardComponentProps = {
  score?: number;
  loading?: boolean;
  recalculate?: () => Promise<number>;
};

export const CardBuilderScore: FunctionComponent<
  BuilderScoreCardComponentProps
> = ({ score = 0, loading, recalculate }) => {
  const [isTransition, transition] = useTransition();

  const recalculateScore = () =>
    transition(() => {
      if (recalculate) recalculate();
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
        Your reputation as a builder, as measured by the{" "}
        <Link
          href="https://passport.talentprotocol.com"
          target="_blank"
          textColor="neutral.500"
          sx={{ textDecoration: "underline" }}
        >
          Talent Passport
        </Link>
        .
      </Typography>

      <Button
        variant="solid"
        color="primary"
        loading={isTransition}
        onClick={() => recalculateScore()}
        sx={{
          "& svg": {
            color: "primary.500",
            width: 20,
            height: 20,
          },
        }}
      >
        Refresh Score
      </Button>
    </BlockyCard>
  );
};
