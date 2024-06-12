import { createPublicClient, http, Address, formatUnits } from "viem";
import { base } from "viem/chains";
import MerkleDistributionAbi from "@/shared/utils/MerkleDistributionAbi.json";
import { erc20Abi } from "./erc20-abi";

const baseRpcUrl = process.env.BASE_RPC_URL;

const publicClient = createPublicClient({
  chain: base,
  transport: http(baseRpcUrl),
});

export async function getBalance(wallet: string): Promise<number> {
  if (!process.env.BOSS_CONTRACT_ADDRESS && !baseRpcUrl) return 0;
  const balance = await publicClient.readContract({
    address: process.env.BOSS_CONTRACT_ADDRESS as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [wallet],
  });

  // Readable balance
  return Number(balance) / 10 ** 18;
}

export async function getBuildCommitted(wallet: string): Promise<number> {
  if (!baseRpcUrl) return 0;

  try {
    const donated = await publicClient.readContract({
      address: "0x556e182ad2b72f5934C2215d6A56cFC19936FdB7",
      abi: MerkleDistributionAbi.abi,
      functionName: "donated",
      args: [wallet as Address],
    });

    // Readable balance
    return Number(donated) / 10 ** 18;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "";
    return 0;
  }
}
