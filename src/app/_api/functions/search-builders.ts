"use server";

import { unstable_cache } from "next/cache";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { makeMap } from "@/shared/utils/make-map";
import { WalletInfo, getWallets } from "../data/wallets";
import { searchLensBuilderProfiles } from "../external/airstack";
import {
  FarcasterAPIUser,
  searchFarcasterBuilderProfiles,
} from "../external/farcaster";
import {
  PassportResult,
  searchTalentProtocolUser,
} from "../external/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

type BuilderSearchResult = {
  wallet: string;
  username: string;
  userImage: string;
};

const processFarcasterBuilderProfiles = async (
  users: FarcasterAPIUser[],
): Promise<BuilderSearchResult[]> => {
  const allWallets = users
    .flatMap((user) => [
      ...(user.verified_addresses?.eth_addresses ?? []),
      user.custody_address,
    ])
    .filter(Boolean);

  const walletToProfile: Record<string, WalletInfo | undefined> = makeMap(
    await getWallets(allWallets),
    (w) => w.wallet,
    (w) => w,
  );

  return users.map((user) => {
    const wallet =
      user.verified_addresses?.eth_addresses[0] ?? user.custody_address;

    const profile = walletToProfile[wallet];

    const image = profile?.image ? profile.image : user.pfp_url;
    return {
      wallet,
      username:
        user.username ?? profile?.username ?? abbreviateWalletAddress(wallet),
      userImage: image,
    };
  });
};

const processTalentProtocolBuilderProfiles = async (
  data: PassportResult[],
): Promise<BuilderSearchResult[]> => {
  const allWallets = data.flatMap((user) => user.verified_wallets);
  const walletToProfile = makeMap(
    await getWallets(allWallets),
    (w) => w.wallet,
    (w) => w,
  );

  return data
    .filter((passport) => !!passport.verified_wallets[0])
    .map((passport) => {
      const wallet = passport.verified_wallets[0];
      const profile = passport.verified_wallets
        .map((wallet) => walletToProfile[wallet])
        .find(Boolean);

      return {
        wallet,
        username:
          passport.user?.username ??
          passport.passport_profile?.name ??
          profile?.username ??
          abbreviateWalletAddress(wallet),
        userImage:
          passport.user?.profile_picture_url ??
          passport.passport_profile?.image_url ??
          profile?.image ??
          "",
      };
    });
};

const processLensBuilderProfiles = async (
  data: unknown[],
): Promise<BuilderSearchResult[]> => {
  throw new Error("Not implemented");
};

export const searchBuilders = unstable_cache(
  async (query: string, domain: string) => {
    switch (domain) {
      case "farcaster":
        const fcData = await searchFarcasterBuilderProfiles(query);
        return await processFarcasterBuilderProfiles(fcData);
      case "talent_protocol":
        const tpData = await searchTalentProtocolUser(query);
        return await processTalentProtocolBuilderProfiles(tpData);
      case "lens":
        const leData = await searchLensBuilderProfiles(query);
        return await processLensBuilderProfiles(leData);
      default:
        return [];
    }
  },
  ["search_builders"] satisfies CacheKey[],
  { revalidate: CACHE_5_MINUTES },
);
