import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";
import { rollbarError } from "@/services/rollbar";
import { User } from "../data/users";
import { CACHE_60_MINUTES } from "../helpers/cache-keys";
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
  verified: boolean;
  user: {
    profile_picture_url: string;
    username: string;
  } | null;
  passport_profile: {
    image_url: string;
    name: string;
    bio: string;
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
    { revalidate: CACHE_60_MINUTES },
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

      try {
        const response = await fetch(url, { headers });
        const data = (await response.json()) as PassportResponse;
        if (!response.ok) return null;
        if (response.status !== 200) return null;
        if (data.error) return null;
        if (!data.passport) return null;
        return data.passport;
      } catch (error) {
        rollbarError("Error fetching Talent Protocol user", error as Error);
        return null;
      }
    },
    [`talent_protocol_${walletId}`] as CacheKey[],
    { revalidate: CACHE_60_MINUTES },
  )(walletId);
};

export const resyncPassportForUser = async (user: User) => {
  const wallets = user.wallets.map((wallet) => wallet.wallet);

  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  if (!api_token || !api_url) {
    throw new Error("API token or URL not found");
  }
  const url = `${api_url}/api/v2/passports`;
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": api_token || "",
  };

  const passports = await Promise.all(
    wallets.map(async (wallet) => {
      return fetch(`${url}/${wallet}`, { headers });
    }),
  );

  const passportData = (await Promise.all(
    passports.map(async (passport) => {
      if (passport.ok) {
        return passport.json();
      }
      return null;
    }),
  )) as PassportResponse[];

  // find the passport with the highest score
  const highestScore = passportData.reduce((acc, curr) => {
    if (!curr) return acc;
    if (!acc) return curr;
    return curr.passport.score > (acc?.passport?.score ?? 0) ? curr : acc;
  }, {} as PassportResponse);

  return highestScore.passport;
};
