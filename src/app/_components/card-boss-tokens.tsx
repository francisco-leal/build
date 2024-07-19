"use client";

import { FunctionComponent } from "react";
import { Button, Stack, Typography, Link } from "@mui/joy";
import { erc20Abi, formatEther } from "viem";
import { base } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type BossTokensCardComponentProps = {
  address?: `0x${string}`;
  loading?: boolean;
};

const BUILD_TOKEN_ADDRESS = "0x3C281A39944a2319aA653D81Cfd93Ca10983D234";

export const CardBossTokens: FunctionComponent<
  BossTokensCardComponentProps
> = ({ loading }) => {
  const { address } = useAccount();
  const { data: tokens, isLoading } = useReadContract({
    abi: erc20Abi,
    address: BUILD_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address!],
    chainId: base.id,
    query: { enabled: address !== undefined },
  });

  const numberTokens = Number(formatEther(tokens ?? BigInt(0)));

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
          {loading || isLoading ? "---.--" : formatLargeNumber(numberTokens)}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        $BUILD is an ERC-20 on Base. Hold 10M+ to receive a budget.
      </Typography>

      <Button
        href={
          "https://app.uniswap.org/explore/tokens/base/0x3c281a39944a2319aa653d81cfd93ca10983d234"
        }
        target="_blank"
        component={Link}
        variant="solid"
        color="primary"
      >
        Buy $BUILD
      </Button>
    </BlockyCard>
  );
};
