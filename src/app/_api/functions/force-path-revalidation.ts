"use server";

import { revalidatePath } from "next/cache";

export const forcePathRevalidation = async (path: string) =>
  revalidatePath(path);
