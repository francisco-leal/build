"use server";

import { unstable_cache } from "next/cache";
import { getFarcasterUser } from "@/services/farcaster";
import { getTalentProtocolUser } from "@/services/talent-protocol";
import { removeDuplicates } from "@/shared/utils/remove-duplicates";
import { getUserFromWallet } from "./users";

export type WalletInfo = {
  username: string;
  wallet: string;
  allWallets: string[];
  image?: string;
  farcasterId?: number;
  passportId?: number;
  userId?: string;
};

export const getWallet = unstable_cache(
  async (walledId: string): Promise<WalletInfo | null> => {
    const [farcasterSocial, talentSocial, bossUser] = await Promise.all([
      getFarcasterUser(walledId),
      getTalentProtocolUser(walledId),
      getUserFromWallet(walledId),
    ]);

    const allWallets = [
      ...(farcasterSocial?.allWallets ?? []),
      ...(talentSocial?.verified_wallets ?? []),
      ...(bossUser?.wallets.map((w) => w.wallet) ?? []),
    ].filter(removeDuplicates);

    return {
      wallet: walledId.toLowerCase(),
      userId: bossUser?.id,
      passportId:
        talentSocial?.passport_id ?? bossUser?.passport_id ?? undefined,
      farcasterId:
        farcasterSocial?.profileTokenId ?? bossUser?.farcaster_id ?? undefined,
      image:
        farcasterSocial?.profile_image ??
        talentSocial?.user?.profile_picture_url ??
        talentSocial?.passport_profile?.image_url,
      username:
        farcasterSocial?.username ??
        talentSocial?.user?.username ??
        bossUser?.username ??
        walledId.toLowerCase(),
      allWallets: allWallets,
    };
  },
  ["wallet_info" as CacheKey],
  { revalidate: CACHE_5_MINUTES },
);

export const createWallet = async (data: any) => {};
