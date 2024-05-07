import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY!);

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
  verified_wallets: Array<string>;
};

type PassportResponse = {
  passport: PassportResult;
  error?: string;
};

type Builder = {
  image: string;
  username: string;
  address: string;
};

const getFarcasterBuilderProfile = async (
  walletId: string,
): Promise<Builder | null> => {
  const query = `query QueryUserOnLensAndFarcaster {
    Socials(
        input: {
            filter: {
                dappName: { _in: [farcaster, lens] },
                identity: { _eq: "${walletId.toLowerCase()}" }
            },
            blockchain: ethereum
        }
    ) {
        Social {
            userAddress
            dappName
            profileName
            profileImage
            userAssociatedAddresses
            profileTokenId
        }
    }
  }`;
  const result = await fetchQuery(query);
  if (result.error) throw new Error(result.error);

  const socials = result.data.Socials.Social;
  if (!socials || socials.length === 0) return null;

  const farcasterSocial = socials.find(
    (social: any) => social.dappName === "farcaster",
  );
  const lensSocial = socials.find((social: any) => social.dappName === "lens");
  if (!farcasterSocial || !lensSocial) return null;

  return {
    image: farcasterSocial.profileImage || lensSocial.profileImage || "",
    username:
      farcasterSocial.profileName ||
      lensSocial.profileName.split("lens/@")[1] ||
      "",
    address: farcasterSocial.userAddress || lensSocial.userAddress || "",
  };
};

const getTalentProtocolBuilderProfile = async (
  walledId: string,
): Promise<Builder | null> => {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  const response = await fetch(`${api_url}/api/v2/passports/${walledId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": api_token || "",
    },
  });

  const data = (await response.json()) as PassportResponse;

  if (response.status === 200) {
    return {
      image: data.passport.passport_profile?.image_url ?? "",
      username: data.passport.user?.username ?? "",
      address: walledId,
    };
  } else {
    return null;
  }
};

export const getBuilder = async (walledId: string): Promise<Builder | null> => {
  return (
    (await getFarcasterBuilderProfile(walledId)) ??
    (await getTalentProtocolBuilderProfile(walledId)) ??
    null
  );
};
