"use client";

import { FunctionComponent } from "react";
import { Button, Stack, Typography } from "@mui/joy";
import { erc20Abi, formatEther } from "viem";
import { base } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { BlockyCard } from "@/shared/components/blocky-card";
import { Coin } from "@/shared/icons/coin";

export type BossTokensCardComponentProps = {
  address?: `0x${string}`;
  loading?: boolean;
};

const BUILD_TOKEN_ADDRESS = "0x3C281A39944a2319aA653D81Cfd93Ca10983D234";

export const CardBossTokens: FunctionComponent<
  BossTokensCardComponentProps
> = ({ loading }) => {
  const { address } = useAccount();
  const { data: tokens } = useReadContract({
    abi: erc20Abi,
    address: BUILD_TOKEN_ADDRESS,
    functionName: "balanceOf",
    args: [address!],
    chainId: base.id,
    query: { enabled: address !== undefined },
  });

  const dividerToText = (divider: number) => {
    if (divider === 1) return "";
    if (divider === 1e3) return "K";
    if (divider === 1e6) return "M";
    if (divider === 1e9) return "B";
    if (divider === 1e12) return "T";
  };

  const displayBalance = () => {
    if (!tokens) return 0;
    let divider = 1;

    if (tokens < 1e18) return "~0";
    else if (tokens < 1e21) divider = 1e3;
    else if (tokens < 1e24) divider = 1e6;
    else divider = 1e9;

    const value = formatEther(tokens / BigInt(divider)).split(".");
    return `${value[0]}.${value[1].slice(0, 2)}${dividerToText(divider)}`;
  };

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
          {loading ? "---.--" : displayBalance()}
        </Typography>
      </Stack>

      <Typography textColor="neutral.500">
        $BUILD is an ERC-20 token on Base, tradable on Uniswap.
      </Typography>

      <Button disabled>Buy $BUILD</Button>
    </BlockyCard>
  );
};
