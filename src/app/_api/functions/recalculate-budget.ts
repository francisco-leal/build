"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { supabase } from "@/db";
import { rollbarError } from "@/services/rollbar";
import { getCurrentUser } from "../data/users";
import { CacheKey } from "../helpers/cache-keys";

export const recalculateBuilderBudget = async (): Promise<number> => {
  const user = await getCurrentUser();
  if (!user) return 0;

  if (user.boss_budget > 0) {
    return user.boss_budget;
  }

  return 0;
};
