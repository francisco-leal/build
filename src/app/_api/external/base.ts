import {
  encodePacked,
  keccak256,
  namehash,
  http,
  createPublicClient,
} from "viem";
import { mainnet, base } from "viem/chains";
import L2ResolverAbi from "@/shared/utils/L2ResolverAbi.json";
import type { Address } from "viem";

const BASENAME_L2_RESOLVER_ADDRESS =
  "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD" as `0x${string}`;

const convertChainIdToCoinType = (chainId: number): string => {
  if (chainId === mainnet.id) {
    return "addr";
  }

  const cointype = (0x80000000 | chainId) >>> 0;
  return cointype.toString(16).toLocaleUpperCase();
};

const convertReverseNodeToBytes = (address: `0x${string}`, chainId: number) => {
  const addressFormatted = address.toLocaleLowerCase() as Address;
  const addressNode = keccak256(addressFormatted.substring(2) as Address);
  const chainCoinType = convertChainIdToCoinType(chainId);
  const baseReverseNode = namehash(
    `${chainCoinType.toLocaleUpperCase()}.reverse`,
  );
  const addressReverseNode = keccak256(
    encodePacked(["bytes32", "bytes32"], [baseReverseNode, addressNode]),
  );
  return addressReverseNode;
};

export const getBasename = async (_address: string) => {
  const address = _address.toLowerCase() as Address;

  const addressReverseNode = convertReverseNodeToBytes(address, base.id);
  const baseClient = createPublicClient({
    chain: base,
    transport: http(),
  });
  const basename = await baseClient.readContract({
    abi: L2ResolverAbi,
    address: BASENAME_L2_RESOLVER_ADDRESS,
    functionName: "name",
    args: [addressReverseNode],
  });

  if (basename) {
    return basename as string;
  }
  return address;
};
