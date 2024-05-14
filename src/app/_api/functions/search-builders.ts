"use server";

import { unstable_cache } from "next/cache";
import { searchLensBuilderProfiles } from "@/services/airstack";
import { searchFarcasterBuilderProfiles } from "@/services/farcaster";
import { searchTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

type BuilderProfile = {
  address: string;
  username: string;
  profile_image: string;
  result_origin: string;
};

const removeUserWithoutWallet = (v: BuilderProfile) => !!v.address;

const removeDuplicateBuilders = (
  v: BuilderProfile,
  i: number,
  a: BuilderProfile[],
) => a.findIndex((t) => t.address === v.address) === i;

export const searchBuilders = unstable_cache(
  async (query: string, domain: string) => {
    if (query?.length < 3) {
      return [];
    }

    switch (domain) {
      case "farcaster":
        return searchFarcasterBuilderProfiles(query).then((v) =>
          v.filter(removeUserWithoutWallet).filter(removeDuplicateBuilders),
        );
      case "talent_protocol":
        return searchTalentProtocolUser(query).then((v) =>
          v.filter(removeUserWithoutWallet).filter(removeDuplicateBuilders),
        );
      case "lens":
        return searchLensBuilderProfiles(query).then((v) => v);
      default:
        return [];
    }
  },
  ["search_builders"] satisfies CacheKey[],
  { revalidate: CACHE_5_MINUTES },
);
