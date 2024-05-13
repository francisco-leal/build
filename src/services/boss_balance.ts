import { supabase } from "@/db";

interface WalletBalance {
  [key: string]: string;
}

const MORALIS_API_URL = "https://deep-index.moralis.io/api/v2.2/erc20";

export async function recalculateBossBalance() {
  if (!process.env.BOSS_CONTRACT_ADDRESS) return;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-api-key": process.env.MORALIS_API_KEY!,
    },
  };

  let data;
  let cursor = "";
  const planRateLimit = 1500; // find throughput based on your plan here: https://moralis.io/pricing/#compare
  const endpointRateLimit = 20; // find endpoint rate limit here: https://docs.moralis.io/web3-data-api/evm/reference/compute-units-cu#rate-limit-cost
  let allowedRequests = planRateLimit / endpointRateLimit;
  do {
    if (allowedRequests <= 0) {
      // wait 1.1 seconds
      await new Promise((r) => setTimeout(r, 1100));
      allowedRequests = planRateLimit / endpointRateLimit;
    }
    // moralis limit is 100!
    const response = await fetch(
      `${MORALIS_API_URL}/${process.env.BOSS_CONTRACT_ADDRESS}/owners?chain=base&limit=100${cursor !== "" ? `&cursor=${cursor}` : ""}&order=DESC`,
      options,
    );
    allowedRequests--;

    if (response.status !== 200) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    data = (await response.json()) as {
      result: { owner_address: string; balance_formatted: string }[];
      cursor: string;
      page: string;
      page_size: string;
    };
    cursor = data.cursor;

    let walletsBalance: WalletBalance = {};

    for (const balanceResult of data.result) {
      walletsBalance[balanceResult.owner_address] =
        balanceResult.balance_formatted;
    }

    const wallets = Object.keys(walletsBalance);

    if (!wallets?.length) continue;

    const { data: values } = await supabase
      .from("users")
      .select("*")
      .in("wallet", wallets)
      .throwOnError();

    if (!values?.length) continue;

    const upsertValues = values.map((user) => ({
      ...user,
      wallet: user.wallet,
      boss_token_balance: Number(walletsBalance[user.wallet]),
    }));

    if (!upsertValues?.length) continue;

    await supabase.from("users").upsert(upsertValues).select().throwOnError();
  } while (data.result.length > 0 && cursor !== "");
}
