

import { BlockyCard } from "@/shared/components/blocky-card";
import { UserShield } from "@/shared/icons";
import { Button, Stack, Typography } from "@mui/joy";
import { FunctionComponent } from "react";

export type BuilderScoreCardComponentProps = {
    score: React.ReactNode;
}

export const BuilderScoreCardComponent: FunctionComponent<BuilderScoreCardComponentProps> = ({
    score
}) => {
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
                The proficiency of Talent Passport users as onchain builders
                (0-100).
            </Typography>

            <Button disabled>Refresh Score</Button>
        </BlockyCard>
    )
}