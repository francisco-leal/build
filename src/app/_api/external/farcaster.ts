import { notFound } from "next/navigation";

type FarcasterAPISearchResponse = {
  result: {
    users: FarcasterAPIUser[];
  };
};

export type FarcasterAPIUser = {
  fid: number;
  username: string;
  display_name: string;
  custody_address: string;
  pfp_url: string;
  verified_addresses: {
    eth_addresses: string[];
  };
};

export const searchFarcasterBuilderProfiles = async (
  query: string,
): Promise<FarcasterAPIUser[]> => {
  const url = `https://api.neynar.com/v2/farcaster/user/search?limit=10&q=${query}`;
  const apiToken = process.env.NEYNAR_API_KEY || "";
  const headers = {
    api_key: apiToken,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) throw notFound();
  if (response.status !== 200) throw notFound();

  const data = (await response.json()) as FarcasterAPISearchResponse;
  return data.result.users;
};

export const getFarcasterUser = async (
  walletId: string,
): Promise<FarcasterAPIUser | null> => {
  const url = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${walletId}`;
  const apiToken = process.env.NEYNAR_API_KEY || "";
  const headers = {
    api_key: apiToken,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  const data = (await response.json()) as { [key: string]: FarcasterAPIUser[] };

  console.log(data, response.ok, response.status, data[walletId]);
  if (!response.ok) return notFound();
  if (response.status !== 200) return notFound();
  if (!data[walletId]) return null;
  return data[walletId][0];
};
