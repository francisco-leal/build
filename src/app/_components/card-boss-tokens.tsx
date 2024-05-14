import { FunctionComponent } from "react";
import { Button, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";
import { formatNumber } from "@/shared/utils/format-number";

export type BossTokensCardComponentProps = {
  tokens?: number;
  loading?: boolean;
};

export const CardBossTokens: FunctionComponent<
  BossTokensCardComponentProps
> = ({ tokens = 0, loading }) => {
  return (
    <BlockyCard>
      <Typography level="body-lg" textColor="primary.500">
        $BUILD Tokens
      </Typography>

      <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
        <Coin />
        <Typography
          sx={{ fontSize: "36px", fontWeight: "bold", color: "common.black" }}
        >
          {loading ? "---.--" : formatNumber(tokens)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        $BUILD is an ERC-20 token on Base, tradable on Uniswap.
      </Typography>

      <Button disabled>Buy $BUILD</Button>
    </BlockyCard>
  );
};
