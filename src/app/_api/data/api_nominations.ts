import { unstable_cache } from "next/cache";
import { supabase } from "@/db";
import { CacheKey, CACHE_5_MINUTES } from "../helpers/cache-keys";

type API_NOMINATION = {
  id: number;
  origin_wallet: string;
  build_points_received: number;
  build_points_sent: number;
  destination_wallet: string;
  nominated_at: string;
};

export const getNominationsForApi = async (params: {
  cursor?: string;
  from?: string;
  to?: string;
}): Promise<API_NOMINATION[]> => {
  return unstable_cache(
    async () => {
      const query = supabase
        .from("boss_nominations")
        .select("*" as const)
        .order("created_at", { ascending: false });

      if (params.cursor) {
        query.lt("created_at", params.cursor);
      }
      if (
        params.from &&
        params.from.length === 42 &&
        params.from.startsWith("0x")
      ) {
        query.eq("origin_wallet_id", params.from);
      }
      if (params.to && params.to.length === 42 && params.to.startsWith("0x")) {
        query.eq("destination_wallet_id", params.to);
      }

      const nominations = await query
        .limit(10)
        .throwOnError()
        .then((res) => res.data ?? []);

      return (
        nominations?.map((nomination) => ({
          id: nomination.id,
          origin_wallet: nomination.origin_wallet_id ?? "", // TODO: a default here should be redundant.
          build_points_received: nomination.boss_points_received,
          build_points_sent: nomination.boss_points_sent,
          destination_wallet: nomination.destination_wallet_id,
          nominated_at: nomination.created_at,
        })) ?? []
      );
    },
    [`api_nominations_${params.cursor ?? "latest"}`] as CacheKey[],
    { revalidate: CACHE_5_MINUTES },
  )();
};
