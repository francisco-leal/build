"use server";

import { unstable_cache } from "next/cache";
import { getFarcasterUser } from "@/services/farcaster";
import { getTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES, CacheKey } from "./helpers/cache-keys";

export type WalletInfo = {
  username: string;
  wallet: string;
  image?: string;
  farcaster_id?: number;
  passport_id?: number;
  allWallets: string[];
};

export const getWalletInfo = unstable_cache(
  async (walledId: string): Promise<WalletInfo | null> => {
    const farcasterSocial = await getFarcasterUser(walledId);
    const talentSocial = await getTalentProtocolUser(walledId);
    const allWallets = [
      ...(farcasterSocial?.allWallets ?? []),
      ...(talentSocial?.verified_wallets ?? []),
    ];

    const user = {
      wallet: walledId.toLowerCase(),
      passportId: talentSocial?.passport_id,
      farcasterId: farcasterSocial
        ? farcasterSocial.profileTokenId
        : undefined,
      image:
        farcasterSocial?.profile_image ??
        talentSocial?.user?.profile_picture_url ??
        talentSocial?.passport_profile?.image_url,
      username:
        farcasterSocial?.username ??
        talentSocial?.user?.username ??
        walledId.toLowerCase(),
      allWallets: allWallets,
    };

    return user;
  },
  ["wallet_info" as CacheKey],
  { revalidate: CACHE_5_MINUTES },
);
