import { supabase } from "@/db";
import {
  createPublicClient,
  getAddress,
  getContract,
  http,
  parseAbiItem,
} from "viem";
import { base } from "viem/chains";

const ManifestoNFTContractAddress =
  "0x4ce28eb5f17fb5ce747e699d2200ed55e4bc0f49";
const ManifestoNFTKVMeta = "manifesto_nft_logs_from_block";

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

export async function updateMintedManifestoNFTUsers() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  // get fromBlock from the database
  const { data: fromBlock } = await supabase
    .from("app_metadata_kv")
    .select("value")
    .eq("key", ManifestoNFTKVMeta)
    .single();
  const currentBlock = await publicClient.getBlockNumber();

  // TODO: break search into smaller block chunks

  const logs = await publicClient.getLogs({
    address: ManifestoNFTContractAddress,
    event: parseAbiItem(
      "event Transfer(address indexed, address indexed, uint256)"
    ),
    fromBlock: BigInt(
      fromBlock?.value || (currentBlock - BigInt(1)).toString()
    ),
    toBlock: currentBlock,
  });

  // update users who have minted the manifesto NFT
  for (const log of logs) {
    // update app_user with manifesto_nft = true
    await supabase
      .from("app_user")
      .update({ manifesto_nft: true })
      .eq("wallet_address", getAddress(log.topics[1]));
  }

  // save toBlock to the database
  const toBlock = logs[logs.length - 1].blockNumber;
  await supabase
    .from("app_metadata_kv")
    .update({ value: toBlock.toString() })
    .eq("key", ManifestoNFTKVMeta);
}
