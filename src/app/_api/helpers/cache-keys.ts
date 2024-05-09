export type CacheKey =
  | `user_${string}`
  | "nominations"
  | "leaderboard"
  | "search_builders";

export const CACHE_5_MINUTES = 60 * 5;
export const CACHE_24_HOURS = 60 * 60 * 24;
