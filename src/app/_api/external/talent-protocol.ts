import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { CACHE_5_MINUTES } from "../helpers/cache-keys";
import { CacheKey } from "../helpers/cache-keys";

type PassportsResponse = {
  passports: PassportResult[];
  error?: string;
};

type PassportResponse = {
  passport: PassportResult;
  error?: string;
};

export type PassportResult = {
  score: number;
  passport_id: number;
  user: {
    profile_picture_url: string;
    username: string;
  } | null;
  passport_profile: {
    image_url: string;
    name: string;
  } | null;
  verified_wallets: Array<string>;
};

export const searchTalentProtocolUser = async (query: string) => {
  return unstable_cache(
    async (query: string) => {
      const api_url = process.env.PASSPORT_API_URL;
      const api_token = process.env.PASSPORT_API_TOKEN;
      const url = `${api_url}/api/v2/passports?keyword=${query}&page=1&per_page=10`;
      const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      };

      if (!api_token || !api_url) {
        throw new Error("API token or URL not found");
      }

      const response = await fetch(url, { headers });
      if (!response.ok) throw notFound();
      if (response.status !== 200) throw notFound();

      const data = (await response.json()) as PassportsResponse;
      return data.passports;
    },
    [`talent_protocol_search_${query}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(query);
};

export const getTalentProtocolUser = async (walletId: string) => {
  return unstable_cache(
    async (id: string) => {
      const api_url = process.env.PASSPORT_API_URL;
      const api_token = process.env.PASSPORT_API_TOKEN;
      const url = `${api_url}/api/v2/passports/${id}`;
      const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      };

      const response = await fetch(url, { headers });
      const data = (await response.json()) as PassportResponse;

      if (!response.ok) return null;
      if (response.status !== 200) return null;
      if (data.error) return null;
      if (!data.passport) return null;
      return data.passport;
    },
    [`talent_protocol_${walletId}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(walletId);
};
