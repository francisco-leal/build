import { createPublicClient, formatUnits, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { erc20Abi } from "./erc20-abi";
import { supabase } from "@/db";

const isMainnet = process.env.IS_MAINNET === "true";
const bossTokenAddress: { [key: string]: `0x${string}` } = {
  base: "0x0",
  "base-sepolia": "0xC5e5045050F1Bc8b3beCBE19735A5a5efAC09818",
};
const publicClient = createPublicClient({
  chain: isMainnet ? base : baseSepolia,
  transport: http(),
});

export async function getBalance(wallet: string) {
  const [balance, decimals] = await Promise.all([
    publicClient.readContract({
      address: bossTokenAddress[isMainnet ? "base" : "base-sepolia"],
      abi: erc20Abi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: bossTokenAddress[isMainnet ? "base" : "base-sepolia"],
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [wallet],
    }),
  ]);

  return parseInt(
    formatUnits(balance as bigint, Number(decimals as bigint)),
    10
  );
}

export async function updateBossTokenBalances() {
  let cursor = "";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-Key": process.env.MORALIS_API_KEY!,
    },
  };

  let data;
  const poolUpdates = [];
  do {
    // moralis limit is 100!
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/erc20/${bossTokenAddress[isMainnet ? "base" : "base-sepolia"]}/owners?chain=${isMainnet ? "base" : "base%20sepolia"}&limit=100${cursor !== "" ? `&cursor=${cursor}` : ""}&order=DESC`,
      options
    );
    if (response.status !== 200) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    data = (await response.json()) as {
      result: { owner_address: string; balance_formatted: string }[];
      cursor: string;
    };
    cursor = data.cursor;

    poolUpdates.push(
      supabase.rpc("update_boss_balances", {
        wallet_balances: data.result.reduce(
          (acc, obj) => {
            acc[obj.owner_address] = parseFloat(obj.balance_formatted);
            return acc;
          },
          {} as { [key: string]: number }
        ),
      })
    );
  } while (data.result.length > 0 && cursor !== "");

  const poolResponses = await Promise.all(poolUpdates);
  for (const response of poolResponses) {
    if (response.error) {
      throw response.error;
    }
  }
}
