"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { getCurrentUser } from "../data/users";
import { User } from "../data/users";
import {
  checkCredentials,
  checkEns,
  checkFarcasterId,
} from "../external/eligibility";
import { CacheKey, CACHE_5_MINUTES } from "../helpers/cache-keys";

export type EligibilityState = {
  isEligible: boolean;
  farcasterResult: string;
  ensResult: string;
  credentialsResult: string;
  nominationsMade: number;
};

const getAndStoreEligibility = async (
  user: User,
): Promise<EligibilityState> => {
  return unstable_cache(
    async (user: User): Promise<EligibilityState> => {
      let eligibilityStatus: EligibilityState = {
        isEligible: false,
        farcasterResult: "",
        ensResult: "",
        credentialsResult: "",
        nominationsMade: 0,
      };

      try {
        const farcasterResult = await checkFarcasterId(user);

        if (!farcasterResult) {
          eligibilityStatus.farcasterResult = "Farcaster ID not found";
        } else {
          eligibilityStatus.isEligible = true;
          eligibilityStatus.farcasterResult = "✅";
        }
      } catch {
        eligibilityStatus.farcasterResult = "Couldn't validate Farcaster ID";
      }

      try {
        const ensResult = await checkEns(user);

        if (!ensResult) {
          eligibilityStatus.ensResult = "ENS not found";
        } else {
          eligibilityStatus.isEligible = true;
          eligibilityStatus.ensResult = "✅";
        }
      } catch {
        eligibilityStatus.ensResult = "Couldn't validate ENS";
      }

      try {
        const credentialsResult = await checkCredentials(user);

        if (!credentialsResult) {
          eligibilityStatus.credentialsResult = "Not found";
        } else {
          eligibilityStatus.isEligible = true;
          eligibilityStatus.credentialsResult = "✅";
        }
      } catch {
        eligibilityStatus.credentialsResult = "Couldn't validate credentials";
      }

      try {
        const { count, error } = await supabase
          .from("boss_nominations")
          .select("*", { count: "exact", head: true })
          .eq("origin_user_id", user.id);

        if (error) {
          throw new Error("Couldn't fetch nominations");
        }

        eligibilityStatus.nominationsMade = count ?? 0;
        if (eligibilityStatus.nominationsMade === 0) {
          eligibilityStatus.isEligible = false;
        }
      } catch {
        eligibilityStatus.nominationsMade = 0;
      }

      const { error } = await supabase
        .from("users")
        .update({
          eligible: eligibilityStatus.isEligible,
          valid_farcaster_id: eligibilityStatus.farcasterResult === "✅",
          valid_ens: eligibilityStatus.ensResult === "✅",
          valid_passport: eligibilityStatus.credentialsResult === "✅",
          nominations_made: eligibilityStatus.nominationsMade,
        })
        .eq("id", user.id);

      if (error) {
        throw new Error(
          "Unable to update the eligibility status - please try again later",
        );
      }

      return eligibilityStatus;
    },
    [`eligibility_${user.id}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(user);
};

export const calculateEligibility = async (): Promise<EligibilityState> => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const eligibilityStatus = await getAndStoreEligibility(user);

  return eligibilityStatus;
};
