import { createPublicClient, formatUnits, http } from "viem";
import { base, baseSepolia } from "viem/chains";
import { erc20Abi } from "./erc20-abi";
import { supabase } from "@/db";

const isTestnet = process.env.NODE === "development";
const bossTokenAddress: { [key: string]: `0x${string}` } = {
  base: "0x0",
  "base-sepolia": "0xB6Ef4B72ccb27DaC43448D4CEf2f685Bca8Fc341",
};
const publicClient = createPublicClient({
  chain: isTestnet ? baseSepolia : base,
  transport: http(),
});

export async function getBalance(wallet: string) {
  const [balance, decimals] = await Promise.all([
    publicClient.readContract({
      address: bossTokenAddress[isTestnet ? "base-sepolia" : "base"],
      abi: erc20Abi,
      functionName: "decimals",
    }),
    publicClient.readContract({
      address: bossTokenAddress[isTestnet ? "base-sepolia" : "base"],
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
  do {
    const response = await fetch(
      `https://deep-index.moralis.io/api/v2.2/erc20/${bossTokenAddress[isTestnet ? "base-sepolia" : "base"]}/owners?chain=${isTestnet ? "base%20sepolia" : "base"}&limit=300${cursor !== "" ? `&cursor=${cursor}` : ""}&order=DESC`,
      options
    );
    data = (await response.json()) as {
      result: { owner_address: string; balance_formatted: string }[];
      cursor: string;
    };
    cursor = data.cursor;

    const { error } = await supabase.rpc("update_boss_balances", {
      wallet_balances: data.result.reduce(
        (acc, obj) => {
          acc[obj.owner_address] = parseFloat(obj.balance_formatted);
          return acc;
        },
        {} as { [key: string]: number }
      ),
    });

    if (error) {
      throw error;
    }
  } while (data.result.length > 0 && cursor !== "");
}
