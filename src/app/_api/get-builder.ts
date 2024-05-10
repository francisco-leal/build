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
    const { farcasterSocial, lensSocial } =
      await getFarcasterBuilderProfile(walledId);
    const talentSocial = await getTalentProtocolUser(walledId);

    return {
      wallet: walledId.toLowerCase(),
      passportId: talentSocial?.passport_id,
      farcasterId: farcasterSocial
        ? parseInt(farcasterSocial.profileTokenId, 10)
        : undefined,
      image:
        farcasterSocial?.profileImage ??
        talentSocial?.user?.profile_picture_url ??
        talentSocial?.passport_profile?.image_url ??
        lensSocial?.profileImage,
      username:
        farcasterSocial?.profileName ??
        talentSocial?.user?.username ??
        lensSocial?.profileName ??
        walledId.toLowerCase(),
    };
  },
  ["get_builder"],
  { revalidate: CACHE_5_MINUTES },
);
