import { fetchQuery, init } from "@airstack/node";

type FarcasterSearchResult = {
  userAddress: string;
  profileName: string;
  dappName: string;
  profileImage: string;
  userAssociatedAddresses: string[];
  profileTokenId: string;
};

init(process.env.AIRSTACK_API_KEY!);

export const searchLensBuilderProfiles = async (
  query: string,
): Promise<FarcasterSearchResult[]> => {
  const response = await fetchQuery(`
      query QueryUserOnLensAndFarcaster {
        Socials(
          input: {
            filter: {
                dappName: { _in: [lens] },
                identity: { 
                  _in: [
                    "lens/@${query}",
                  ]
                }
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
      }
    `);

  if (response.error) throw new Error(response.error);
  const data: FarcasterSearchResult[] = response.data?.Socials?.Social ?? [];
  return data;
};

export const getFarcasterBuilderProfile = async (
  walletId: string,
): Promise<{
  farcasterSocial: FarcasterSearchResult | undefined;
  lensSocial: FarcasterSearchResult | undefined;
}> => {
  if (!walletId) return { farcasterSocial: undefined, lensSocial: undefined };
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
  if (!socials || socials.length === 0)
    return {
      farcasterSocial: undefined,
      lensSocial: undefined,
    };

  const farcasterSocial = socials.find(
    (social: any) => social.dappName === "farcaster",
  ) as FarcasterSearchResult | undefined;
  const lensSocial = socials.find(
    (social: any) => social.dappName === "lens",
  ) as FarcasterSearchResult | undefined;

  return { farcasterSocial, lensSocial };
};
