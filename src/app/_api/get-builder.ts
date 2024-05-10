"use server";

import { init, fetchQuery } from "@airstack/node";

init(process.env.AIRSTACK_API_KEY!);

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

type Builder = {
  username: string;
  wallet: string;
  image?: string;
  farcasterId?: number;
  passportId?: number;
};

type FarcasterSocial = {
  profileTokenId?: number,
  userAddress?: string,
  dappName?: string,
  profileName?: string,
  profileImage?: string,
  userAssociatedAddresses?: string[],
}



const getFarcasterBuilderProfile = async (
  walletId: string,
) : Promise<{
  farcasterSocial: FarcasterSocial | undefined;
  lensSocial: FarcasterSocial | undefined;
}>=> {
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
  if (!socials || socials.length === 0) return {
    farcasterSocial: undefined,
    lensSocial: undefined,
  };

  const farcasterSocial = socials
    .find((social: any) => social.dappName === "farcaster") as FarcasterSocial | undefined;
  const lensSocial = socials
    .find((social: any) => social.dappName === "lens") as LensSocial | undefined;

  return { farcasterSocial, lensSocial };
  /**
    wallet: walletId,
    farcasterId: parseInt(farcasterSocial.profileTokenId, 10),
    passportId: undefined,
    image: farcasterSocial.profileImage || lensSocial.profileImage || null,
    username:
      farcasterSocial.profileName ||
      lensSocial.profileName.split("lens/@")[1] ||
      "",
  }; */
};

const getTalentProtocolBuilderProfile = async (
  walledId: string,
): Promise<PassportResult | null> => {
  const api_url = process.env.PASSPORT_API_URL;
  const api_token = process.env.PASSPORT_API_TOKEN;

  try {
    const response = await fetch(`${api_url}/api/v2/passports/${walledId}`, {
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
};

export const getBuilder = async (walledId: string): Promise<Builder | null> => {
  const { farcasterSocial, lensSocial } = await getFarcasterBuilderProfile(walledId);
  const talentSocial = await getTalentProtocolBuilderProfile(walledId);

  return {
    wallet: walledId.toLowerCase(),
    farcasterId: farcasterSocial?.profileTokenId ,
    passportId: talentSocial?.passport_id,
    image: 
      farcasterSocial?.profileImage ??
      talentSocial?.user?.profile_picture_url ??
      lensSocial?.profileImage,
    username: 
      farcasterSocial?.profileName ??
      talentSocial?.user?.username ??
      lensSocial?.profileName ?? 
      walledId.toLowerCase(),
  };
};
