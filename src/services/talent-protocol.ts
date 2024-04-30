type PassportResult = {
  score: number;
  user: {
    profile_picture_url: string;
    username: string;
  } | null;
  passport_profile: {
    image_url: string;
    name: string;
  } | null;
};
export async function getBuilderScore(wallet: string): Promise<number> {
  const { data, error } = await searchTalentProtocolUser(wallet);

  if (error || !data || data.length === 0) {
    if (error.indexOf("Resource not found") !== -1) {
      return 0;
    }
    throw new Error(error || "No data found");
  }

  return data[0].score;
}

export async function searchTalentProtocolUser(
  querySearch: string,
): Promise<{ data: PassportResult[] | null; error: any }> {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  if (!api_token || !api_url) {
    return { data: null, error: new Error("API token or URL not found") };
  }

  if (querySearch.length === 42 && querySearch.startsWith("0x")) {
    const walletAddress = querySearch.toLowerCase();
    try {
      const response = await fetch(
        `${api_url}/api/v2/passports/${walletAddress}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": api_token || "",
          },
        },
      );

      const data = await response.json();

      if (response.status === 200) {
        return { data: [data.passport], error: null };
      } else {
        return { error: data.error, data: null };
      }
    } catch (e) {
      return { error: e, data: null };
    }
  }
  try {
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

    const data = await response.json();

    if (response.status === 200) {
      return { error: null, data: data.passports };
    } else {
      return { error: data.error, data: null };
    }
  } catch (e) {
    return { error: e, data: null };
  }
}
