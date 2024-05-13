import { supabase } from "@/db";

type BuilderProfile = {
  address: string;
  username: string;
  profile_image: string;
  result_origin: string;
  profileTokenId: string;
};

type FarcasterAPIUser = {
  fid: number;
  username: string;
  display_name: string;
  custody_address: string;
  pfp_url: string;
  verified_addresses: {
    eth_addresses: string[];
  };
};

type FarcasterAPISearchResponse = {
  result: {
    users: FarcasterAPIUser[];
  };
};

export const searchFarcasterBuilderProfiles = async (
  query: string,
): Promise<BuilderProfile[]> => {
  const url = `https://api.neynar.com/v2/farcaster/user/search?limit=10&q=${query}`;
  const apiToken = process.env.NEYNAR_API_KEY || "";
  const headers = {
    api_key: apiToken,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(response.statusText);
  const data = (await response.json()) as FarcasterAPISearchResponse;

  const allWallets = data.result.users.flatMap((user) => {
    return user.verified_addresses?.eth_addresses?.length > 0
      ? user.verified_addresses.eth_addresses
      : [user.custody_address];
  });

  const { data: usersInDB } = await supabase
    .from("users")
    .select("*")
    .in("wallet", allWallets);

  return data.result.users.map((user) => {
    const userInDB = usersInDB?.find((u) => {
      const userAddresses = user.verified_addresses?.eth_addresses;
      if (userAddresses) {
        return userAddresses.some((address) => address === u.wallet);
      } else {
        return u.wallet === user.custody_address;
      }
    });
    const address =
      userInDB?.wallet ||
      user.verified_addresses?.eth_addresses[0] ||
      user.custody_address;

    return {
      address,
      username: user.username,
      profile_image: user.pfp_url,
      result_origin: "farcaster",
      profileTokenId: user.fid.toString(),
    };
  });
};

export const getFarcasterBuilderProfile = async (
  walletId: string,
): Promise<BuilderProfile | null> => {
  const url = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${walletId}`;
  const apiToken = process.env.NEYNAR_API_KEY || "";
  const headers = {
    api_key: apiToken,
    accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(response.statusText);
  const data = (await response.json()) as FarcasterAPIUser[];
  if (!data.length) return null;

  const searchedUser = data[0];
  return {
    address:
      searchedUser.verified_addresses?.eth_addresses[0] ||
      searchedUser.custody_address,
    username: searchedUser.username,
    profile_image: searchedUser.pfp_url,
    result_origin: "farcaster",
    profileTokenId: searchedUser.fid.toString(),
  };
};
