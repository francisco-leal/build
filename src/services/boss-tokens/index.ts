import { createPublicClient, http, Address, formatUnits } from "viem";
import { base } from "viem/chains";
import { erc20Abi } from "./erc20-abi";

const baseRpcUrl = process.env.BASE_RPC_URL;

const publicClient = createPublicClient({
  chain: base,
  transport: http(baseRpcUrl),
});

export async function getBalance(wallet: string): Promise<number> {
  if (!process.env.BOSS_CONTRACT_ADDRESS) return 0;
  const balance = await publicClient.readContract({
    address: process.env.BOSS_CONTRACT_ADDRESS as Address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [wallet],
  });

  // Readable balance
  return Number(balance) / 10 ** 18;
}
