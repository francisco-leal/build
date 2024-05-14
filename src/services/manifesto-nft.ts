import { createPublicClient, getContract, http } from "viem";
import { base } from "viem/chains";
import { supabase } from "@/db";

const ManifestoNFTContractAddress =
  "0x4ce28eb5f17fb5ce747e699d2200ed55e4bc0f49";

const wagmiAbi = [
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

export async function hasMintedManifestoNFT(wallet_address: string) {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const contract = getContract({
    address: ManifestoNFTContractAddress,
    abi: wagmiAbi,
    client: publicClient,
  });

  const balanceOf: bigint = (await contract.read.balanceOf([
    wallet_address,
  ])) as bigint;

  return balanceOf > 0;
}
