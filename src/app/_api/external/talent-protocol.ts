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

  if (!api_token || !api_url) {
    throw new Error("API token or URL not found");
  }

  const response = await fetch(
    `${api_url}/api/v2/passports?keyword=${query}&page=1&per_page=10`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      },
    },
  );

  const data = (await response.json()) as PassportsResponse;
  if (response.status !== 200) throw new Error(data.error);
  return data.passports;
};

export async function getTalentProtocolUser(walletId: string) {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  try {
    const response = await fetch(`${api_url}/api/v2/passports/${walletId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": api_token || "",
      },
    });

    if (response.status === 200) {
      const data = (await response.json()) as PassportResponse;
      return data.passport;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
