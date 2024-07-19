"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { calculateUserBudget } from "@/app/_api/data/users";
import { getCurrentUser } from "../data/users";

export const recalculateBuilderBudget = async (): Promise<number> => {
  const user = await getCurrentUser();
  if (!user) return 0;

  const budget = await calculateUserBudget(user, user.wallet);

  revalidatePath(`/stats`);

  return budget;
};
