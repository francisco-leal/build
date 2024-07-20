import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { rollbarError } from "@/services/rollbar";
import { CACHE_5_MINUTES } from "../helpers/cache-keys";
import { CacheKey } from "../helpers/cache-keys";

type FarcasterAPISearchResponse = {
  result: {
    users: FarcasterAPIUser[];
  };
};

export type FarcasterAPIUser = {
  fid: number;
  profile: {
    bio: {
      text: string;
    };
  };
  username: string;
  display_name: string;
  custody_address: string;
  pfp_url: string;
  power_badge: boolean;
  verified_addresses: {
    eth_addresses: string[];
  };
};

export const searchFarcasterBuilderProfiles = async (
  query: string,
): Promise<FarcasterAPIUser[]> => {
  return unstable_cache(
    async (id: string) => {
      const url = `https://api.neynar.com/v2/farcaster/user/search?limit=10&q=${id}`;
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
    },
    [`farcaster_search_${query}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(query);
};

export const getFarcasterUser = async (
  walletId: string,
): Promise<FarcasterAPIUser | null> => {
  return unstable_cache(
    async (id: string) => {
      const url = `https://api.neynar.com/v2/farcaster/user/bulk-by-address?addresses=${id}`;
      const apiToken = process.env.NEYNAR_API_KEY || "";
      const headers = {
        api_key: apiToken,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(url, { headers });
        const data = (await response.json()) as {
          [key: string]: FarcasterAPIUser[];
        };
        if (!response.ok) return null;
        if (response.status !== 200) return null;
        if (!data[walletId]) return null;
        return (
          data[walletId].filter((v) => !!v.display_name || !!v.pfp_url).at(0) ??
          null
        );
      } catch (error) {
        rollbarError("Error fetching Farcaster user", error as Error);
        return null;
      }
    },
    [`farcaster_${walletId}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(walletId);
};

export const getFarcasterUserByFid = async (
  id: number,
): Promise<FarcasterAPIUser | null> => {
  return unstable_cache(
    async (id: number) => {
      const url = `https://api.neynar.com/v2/farcaster/user/bulk?fids=${id}`;
      const apiToken = process.env.NEYNAR_API_KEY || "";
      const headers = {
        api_key: apiToken,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });
      const data = (await response.json()) as {
        users: FarcasterAPIUser[];
      };

      if (!response.ok) return null;
      if (response.status !== 200) return null;
      if (!data.users) return null;
      return data["users"].find((v) => v.fid === id) ?? null;
    },
    [`farcaster_${id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(id);
};

export const getFollowerCount = async (): Promise<number> => {
  return unstable_cache(
    async () => {
      const url = `https://api.neynar.com/v2/farcaster/channel/search?q=build`;
      const apiToken = process.env.NEYNAR_API_KEY || "";
      const headers = {
        api_key: apiToken,
        accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });
      if (!response.ok) return 34200;
      if (response.status !== 200) return 34200;
      const data = (await response.json()) as {
        channels: { id: string; follower_count: number }[];
      };
      if (!data.channels) return 34200;
      const follower_count = data.channels
        .filter((v) => v.id === "build")
        .at(0)?.follower_count;
      return follower_count ?? 34200;
    },
    ["farcaster_followers"] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};
