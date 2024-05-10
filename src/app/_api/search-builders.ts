"use server";

import { unstable_cache } from "next/cache";
import { searchFarcasterBuilderProfiles } from "@/services/farcaster";
import { searchTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "./helpers/cache-keys";

type BuilderProfile = {
  address: string;
  username: string;
  profile_image: string;
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
    const [talentProtocolResults, farcasterResults] = await Promise.all([
      searchTalentProtocolUser(query)
        .then((data): BuilderProfile[] => {
          return data.map((t) => ({
            address:
              t.verified_wallets?.length > 0 ? t.verified_wallets[0] : "",
            username: t.user ? t.user.username : t.passport_profile!.name,
            profile_image: t.user
              ? t.user.profile_picture_url
              : t.passport_profile!.image_url,
          }));
        })
        .catch((error) => {
          console.warn("Talent protocol search has failed", error);
          return [];
        }),
      searchFarcasterBuilderProfiles(query)
        .then((data): BuilderProfile[] => {
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
        })
        .catch((error) => {
          console.warn("Farcaster search has failed", error);
          return [];
        }),
    ]);

    return [...talentProtocolResults, ...farcasterResults]
      .filter(removeUserWithoutWallet)
      .filter(removeDuplicateBuilders);
  },
  ["search_builders"] satisfies CacheKey[],
  { revalidate: CACHE_5_MINUTES },
);
