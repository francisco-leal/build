"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "@/db";
import { rollbarError } from "@/services/rollbar";
import { BadRequestError } from "@/shared/utils/error";
import { getCurrentUser } from "../data/users";
import { resyncPassportForUser } from "../external/talent-protocol";
import { CacheKey } from "../helpers/cache-keys";

export const recalculateBuilderScore = async (): Promise<number> => {
  const user = await getCurrentUser();
  if (!user)
    throw new BadRequestError("You must have a wallet connected to refresh!");

  let highestPassport;
  try {
    highestPassport = await resyncPassportForUser(user);
  } catch (error) {
    rollbarError(`Error Resyncing Passport for user: ${user.id}`);
    throw new BadRequestError(
      "Couldn't resync your passport, try again later.",
    );
  }
  await supabase
    .from("users")
    .update({
      passport_id: highestPassport.passport_id,
      passport_builder_score: highestPassport.score,
    })
    .eq("id", user.id)
    .throwOnError();

  revalidateTag(`user_${user.id}` as CacheKey);
  revalidatePath("/stats");

  return highestPassport.score;
};
