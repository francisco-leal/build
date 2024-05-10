export type CacheKey =
  | `user_${string}`
  | `user_external_${string}`
  | "nominations"
  | "leaderboard"
  | "search_builders"
  | "get_builder";

export const CACHE_5_MINUTES = 60 * 5;
export const CACHE_24_HOURS = 60 * 60 * 24;
