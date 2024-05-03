

import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons";
import { Button, Stack, Typography } from "@mui/joy";
import { FunctionComponent } from "react";

export type BossTokensCardComponentProps = {
    tokens: React.ReactNode;
}

export const BossTokensCardComponent : FunctionComponent<BossTokensCardComponentProps> = ({
    tokens
}) => {
    return (
        <BlockyCard>
            <Typography level="body-lg" textColor="primary.500">
            $BOSS Tokens
            </Typography>

            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
                <Coin />
                <Typography
                    sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
                >
                    {tokens}
                </Typography>
            </Stack>

            <Typography  textColor="neutral.500">
            $BOSS is an ERC-20 token on Base, tradable on Uniswap.
            </Typography>

            <Button disabled>Buy $BOSS</Button>
        </BlockyCard>
    )
}