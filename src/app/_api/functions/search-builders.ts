"use server";

import { unstable_cache } from "next/cache";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { makeMap } from "@/shared/utils/make-map";
import { WalletInfo, getWallets } from "../data/wallets";
import {
  searchLensBuilderProfiles,
  LensSearchResult,
} from "../external/airstack";
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

const ipfsToURL = (ipfsAddress: string) => {
  if (!ipfsAddress) return "";

  if (ipfsAddress?.includes("http") || ipfsAddress === "") {
    return ipfsAddress;
  }
  return "https://ipfs.io/" + ipfsAddress.replace("://", "/");
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
      userImage: ipfsToURL(image),
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
        userImage: ipfsToURL(
          passport.user?.profile_picture_url ??
            passport.passport_profile?.image_url ??
            profile?.image ??
            "",
        ),
      };
    });
};

const processLensBuilderProfiles = async (
  data: LensSearchResult[],
  query: string,
): Promise<BuilderSearchResult[]> => {
  return data
    .filter((l) => l.profileName.toLowerCase().includes(query.toLowerCase()))
    .map((lensUser) => {
      return {
        wallet: lensUser.userAddress,
        username: lensUser.profileName.split("/@")[1],
        userImage: ipfsToURL(lensUser.profileImage),
      };
    });
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
        return await processLensBuilderProfiles(leData, query);
      default:
        return [];
    }
  },
  ["search_builders"] satisfies CacheKey[],
  { revalidate: CACHE_5_MINUTES },
);
