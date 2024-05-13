"use server";

import { unstable_cache } from "next/cache";
import { getFarcasterBuilderProfile } from "@/services/farcaster";
import { getTalentProtocolUser } from "@/services/talent-protocol";
import { CACHE_5_MINUTES } from "./helpers/cache-keys";

type Builder = {
  username: string;
  wallet: string;
  image?: string;
  farcasterId?: number;
  passportId?: number;
};

export const getBuilder = unstable_cache(
  async (walledId: string): Promise<Builder | null> => {
    if (!walledId) return null;
    const farcasterSocial = await getFarcasterBuilderProfile(walledId);
    const talentSocial = await getTalentProtocolUser(walledId);

    const user = {
      wallet: walledId.toLowerCase(),
      passportId: talentSocial?.passport_id,
      farcasterId: farcasterSocial
        ? parseInt(farcasterSocial.profileTokenId, 10)
        : undefined,
      image:
        farcasterSocial?.profile_image ??
        talentSocial?.user?.profile_picture_url ??
        talentSocial?.passport_profile?.image_url,
      username:
        farcasterSocial?.username ??
        talentSocial?.user?.username ??
        walledId.toLowerCase(),
    };

    return user;
  },
  ["get_builder"],
  { revalidate: CACHE_5_MINUTES },
);
