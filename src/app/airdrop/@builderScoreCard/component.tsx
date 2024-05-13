import { FunctionComponent } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { UserShield } from "@/shared/icons/user-shield";

export type BuilderScoreCardComponentProps = {
  score: React.ReactNode;
};

export const BuilderScoreCardComponent: FunctionComponent<
  BuilderScoreCardComponentProps
> = ({ score }) => {
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
          {score}
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

      <Button disabled>Refresh Score</Button>
    </BlockyCard>
  );
};
