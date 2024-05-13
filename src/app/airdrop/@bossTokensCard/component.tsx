import { FunctionComponent } from "react";
import { Button, Stack, Typography } from "@mui/joy";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";

export type BossTokensCardComponentProps = {
  tokens: React.ReactNode;
};

export const BossTokensCardComponent: FunctionComponent<
  BossTokensCardComponentProps
> = ({ tokens }) => {
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
          {tokens}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        $BUILD is an ERC-20 token on Base, tradable on Uniswap.
      </Typography>

      <Button disabled>Buy $BUILD</Button>
    </BlockyCard>
  );
};

export const BossTokensCardLoading = () => (
  <BossTokensCardComponent tokens={"--.---"} />
);
