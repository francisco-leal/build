import {
  createPublicClient,
  http,
  parseAbiItem,
  Address,
  formatUnits,
} from "viem";
import { base } from "viem/chains";
import { supabase } from "@/db";

const baseRpcUrl = process.env.BASE_RPC_URL;

const publicClient = createPublicClient({
  chain: base,
  transport: http(baseRpcUrl),
});

interface WalletBalance {
  [key: string]: bigint;
}

const blocksPerBatch = 500;

export async function recalculateBossBalance(
  lastBlockNumber: string | undefined,
) {
  let blockNumber = lastBlockNumber
    ? lastBlockNumber
    : process.env.BOSS_CONTRACT_DEPLOY_BLOCK_NUMBER;

  if (!blockNumber) throw Error("Invalid block number");

  const currentBlockNumber = await publicClient.getBlockNumber();

  const batches = generateBatches(
    parseInt(blockNumber),
    Number(currentBlockNumber),
    blocksPerBatch,
  );

  console.log(`Batches: ${batches.length}`);

  for (const batch of batches) {
    const [batchStart, batchEnd] = batch;

    console.log(`Batch Start: ${batchStart}, Batch End: ${batchEnd}`);
    const logs = await getLogs(batchStart, batchEnd);

    console.log(`Logs: ${logs.length}`);

    let walletBalanceChange: WalletBalance = {};

    for (const log of logs) {
      const fromAddress = log.args[0];
      const toAddress = log.args[1];
      const value = log.args[2] || BigInt(0);

      if (fromAddress) {
        console.log("fromAddress", fromAddress);
        let fromCurrentBalance = walletBalanceChange[fromAddress] || BigInt(0);
        walletBalanceChange[fromAddress] = fromCurrentBalance - value;
      }

      if (toAddress) {
        console.log("toAddress", toAddress);
        let toCurrentBalance = walletBalanceChange[toAddress] || BigInt(0);
        walletBalanceChange[toAddress] = toCurrentBalance + value;
      }
    }

    const wallets = Object.keys(walletBalanceChange);
    console.log("Wallets", wallets.length);

    if (wallets.length == 0) continue;

    const { data: values } = await supabase
      .from("users")
      .select("*")
      .in("wallet", wallets)
      .throwOnError();

    console.log("Values", values?.length);
    if (!values?.length) continue;

    console.log("Generating upsert values", values);
    const upsertValues = values.map((user) => ({
      ...user,
      wallet: user.wallet,
      boss_token_balance:
        user.boss_token_balance +
        Number(walletBalanceChange[user.wallet]) / 10 ** 18,
    }));

    if (!upsertValues?.length) continue;

    await supabase.from("users").upsert(upsertValues).select().throwOnError();
  }
  return Number(currentBlockNumber);
}

function generateBatches(start: number, end: number, batchSize: number) {
  const batches = [];
  for (let i = start; i <= end; i += batchSize) {
    const batchStart = i;
    const batchEnd = Math.min(i + batchSize - 1, end);
    batches.push([batchStart, batchEnd]);
  }
  return batches;
}

async function getLogs(fromBlock: number, toBlock: number) {
  return await publicClient.getLogs({
    address: process.env.BOSS_CONTRACT_ADDRESS as Address,
    fromBlock: BigInt(fromBlock),
    toBlock: BigInt(toBlock),
    event: parseAbiItem(
      "event Transfer(address indexed, address indexed, uint256)",
    ),
  });
}
