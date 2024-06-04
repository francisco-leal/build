"use server";
import { supabase } from "@/db";
import { getBalance } from "@/services/boss-tokens";
import { rollbarError } from "@/services/rollbar";
import { getCurrentUser } from "../data/users";
import { checkCredentials, checkEns, checkFarcasterId } from "../external/eligibility";

export type EligibilityState = {
  isEligible: boolean;
  farcasterResult: string;
  ensResult: string;
  credentialsResult: string;
};


export const calculateEligibility = async (): Promise<EligibilityState> => {
  const user = await getCurrentUser();

  let eligibilityStatus: EligibilityState = {
    isEligible: false,
    farcasterResult: "",
    ensResult: "",
    credentialsResult: "",
  };

  if (!user) {
    throw new Error("User not found");
  }

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
      eligibilityStatus.credentialsResult = "Credentials not found";
    } else {
      eligibilityStatus.isEligible = true;
      eligibilityStatus.credentialsResult = "✅";
    }
  } catch {
    eligibilityStatus.credentialsResult = "Couldn't validate credentials";
  }

  return eligibilityStatus;
};
