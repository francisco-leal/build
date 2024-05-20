import { createPublicClient, getContract, http } from "viem";
import { base } from "viem/chains";

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

export async function hasMintedManifestoNFT(
  wallet_address: string,
): Promise<number> {
  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });
  
    const contract = getContract({
      address: ManifestoNFTContractAddress,
      abi: wagmiAbi,
      client: publicClient,
    });
  
    const balanceOf = (await contract.read.balanceOf([
      wallet_address,
    ]));
  
    return Number(balanceOf);
  } catch (e) {
    console.error(`Error checking if user ${wallet_address} has minted NFT`, e);
    return 0;
  }
}
