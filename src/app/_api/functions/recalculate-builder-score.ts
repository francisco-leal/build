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

  const highestPassport = await resyncPassportForUser(user);
  await supabase
    .from("users")
    .update({
      passport_id: highestPassport.passport_id,
      passport_builder_score: highestPassport.score,
    })
    .eq("id", user.id)
    .throwOnError();

  if (user.boss_budget === 0) {
    const result = await supabase.rpc("calculate_boss_budget_user", {
      user_to_update: user.id,
    });

    if (result.error) {
      rollbarError("Error Recalculating builder budget", result.error.message);
      throw new BadRequestError(
        "Couldn't update your budget, try again later.",
      );
    }
  }

  revalidateTag(`user_${user.id}` as CacheKey);
  revalidatePath("/stats");

  return highestPassport.score;
};
