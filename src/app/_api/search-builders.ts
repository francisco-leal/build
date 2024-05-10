"use server";

import { unstable_cache } from "next/cache";
import { init, fetchQuery } from "@airstack/node";
import { searchTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "./helpers/cache-keys";

init(process.env.AIRSTACK_API_KEY!);

type FarcasterSearchResult = {
  userAddress: string;
  profileName: string;
  dappName: string;
  profileImage: string;
  userAssociatedAddresses: string[];
  profileTokenId: string;
};

type BuilderProfile = {
  address: string;
  username: string;
  profile_image: string;
  dapp: string;
  profileTokenId: number;
};

const filterFarcasterAddress = (
  userAddress: string,
  userAssociatedAddresses: string[],
) => {
  if (userAssociatedAddresses.length === 1) {
    return userAddress;
  }
  const f = userAssociatedAddresses.filter((ua) => ua !== userAddress);
  return f.length === 1 ? f[0] : userAddress;
};

const removeUserWithoutWallet = (v: BuilderProfile) => !!v.address;

const removeDuplicateBuilders = (
  v: BuilderProfile,
  i: number,
  a: BuilderProfile[],
) => a.findIndex((t) => t.address === v.address) === i;

export const searchBuilders = unstable_cache(
  async (query: string) => {
    const isAdressSearch = query.length === 42 && query.startsWith("0x");

    const farcasterQuery = `query QueryUserOnLensAndFarcaster {
              Socials(
                  input: {
                      filter: {
                          dappName: { _in: [farcaster, lens] },
                          identity: { ${
                            isAdressSearch
                              ? `_eq: "${query}"`
                              : `_in: [
                                  "lens/@${query}",
                                  "fc_fname:${query}", 
                                  "${query}.eth"
                                ]`
                          } 
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
          }`;

    const [talentProtocolResults, farcasterResults] = await Promise.all([
      searchTalentProtocolUser(query).then((res): BuilderProfile[] => {
        if (res.error) throw new Error(res.error);
        return (
          res.data?.map((t) => ({
            address: isAdressSearch
              ? query
              : t.verified_wallets?.length > 0
                ? t.verified_wallets[0]
                : "",
            username: t.user ? t.user.username : t.passport_profile!.name,
            profile_image: t.user
              ? t.user.profile_picture_url
              : t.passport_profile!.image_url,
            dapp: "talent-protocol",
            profileTokenId: 0,
          })) ?? []
        );
      }),
      fetchQuery(farcasterQuery).then((res): BuilderProfile[] => {
        if (res.error) throw new Error(res.error);
        const data: FarcasterSearchResult[] = res.data?.Socials?.Social ?? [];
        return data.map((s) => ({
          address: filterFarcasterAddress(
            s.userAddress,
            s.userAssociatedAddresses,
          ),
          username: s.profileName,
          profile_image: s.profileImage,
          dapp: s.dappName,
          profileTokenId: parseInt(s.profileTokenId, 10),
        }));
      }),
    ]);

    return [...talentProtocolResults, ...farcasterResults]
      .filter(removeUserWithoutWallet)
      .filter(removeDuplicateBuilders);
  },
  ["search_builders"] satisfies CacheKey[],
  { revalidate: CACHE_5_MINUTES },
);
