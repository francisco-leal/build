"use server";
import { revalidatePath } from "next/cache";
export const forcePathRevalidation = revalidatePath;
