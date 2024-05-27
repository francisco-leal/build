"use server";

import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { Database } from "@/db/database.types";
import { CACHE_5_MINUTES, CacheKey } from "../helpers/cache-keys";

type Tables = Database["public"]["Tables"];

export type ApiKey = Tables["api_keys"]["Row"];

export const getApiKey = async (apiKey: string): Promise<ApiKey | null> => {
  return unstable_cache(
    async (apiKey: string) => {
      const { data } = await supabase
        .from("api_keys")
        .select("*")
        .eq("key", apiKey)
        .single()
        .throwOnError();

      return data;
    },
    [`api_key_${apiKey}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )(apiKey);
};
