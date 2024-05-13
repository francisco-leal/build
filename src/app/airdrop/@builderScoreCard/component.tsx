import { FunctionComponent } from "react";
import { Button, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { UserShield } from "@/shared/icons/user-shield";
import { formatNumber } from "@/shared/utils/format-number";

export type BuilderScoreCardComponentProps = {
  score?: number;
  loading?: boolean;
};

export const BuilderScoreCardComponent: FunctionComponent<
  BuilderScoreCardComponentProps
> = ({ score = 0, loading }) => {
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
          {loading ? "--.---" : formatNumber(score)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        The proficiency of Talent Passport users as onchain builders (0-100).
      </Typography>

      <Button disabled>Refresh Score</Button>
    </BlockyCard>
  );
};

export const BuilderScoreCardLoading = () => (
  <BuilderScoreCardComponent loading />
);
