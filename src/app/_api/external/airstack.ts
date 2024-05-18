import { fetchQuery, init } from "@airstack/node";

export type LensSearchResult = {
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
): Promise<LensSearchResult[]> => {
  const response = await fetchQuery(`
      query QueryUserOnLensAndFarcaster {
        Socials(
          input: {
            filter: {
                dappName: { _in: [lens] },
                profileName: { _regex: "${query}" }
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
  const data: LensSearchResult[] = response.data?.Socials?.Social ?? [];
  return data;
};

export const getLensBuilderProfile = async (
  walletId: string,
): Promise<{
  lensSocial: LensSearchResult | undefined;
}> => {
  if (!walletId) return { lensSocial: undefined };
  const query = `query QueryUserOnLensAndFarcaster {
      Socials(
          input: {
              filter: {
                  dappName: { _in: [lens] },
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
      lensSocial: undefined,
    };

  const lensSocial = socials.find(
    (social: any) => social.dappName === "lens",
  ) as LensSearchResult | undefined;

  return { lensSocial };
};
