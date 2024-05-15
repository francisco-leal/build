import { notFound } from "next/navigation";
import { supabase } from "@/db";

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

export const searchTalentProtocolUser = async (
  query: string,
): Promise<PassportResult[]> => {
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
};

export const getTalentProtocolUser = async (
  walletId: string,
): Promise<PassportResult | null> => {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;
  const url = `${api_url}/api/v2/passports/${walletId}`;
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": api_token || "",
  };

  const response = await fetch(url, { headers });
  const data = (await response.json()) as PassportResponse;

  if (!response.ok) throw notFound();
  if (response.status !== 200) throw notFound();
  if (data.error) throw notFound();
  if (!data.passport) return null;
  return data.passport;
};
