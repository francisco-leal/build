type PassportResult = {
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

type PassportResponse = {
  passport: PassportResult;
  error?: string;
};

type PassportsResponse = {
  passports: PassportResult[];
  error?: string;
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

/** TODO review this, and possibly move it somewhere else! */
export async function getBuilderScore(wallet: string) {
  const user = await getTalentProtocolUser(wallet).catch(() => null);
  return { score: user?.score ?? 0, passport_id: user?.passport_id ?? 0 };
}

export async function searchTalentProtocolUser(
  querySearch: string,
): Promise<PassportResult[]> {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  if (!api_token || !api_url) {
    throw new Error("API token or URL not found");
  }

  const response = await fetch(
    `${api_url}/api/v2/passports?keyword=${querySearch}&page=1&per_page=10`,
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
}
