export type CacheKey =
  | `user_${string}`
  | `wallet_info_${string}`
  | "nominations"
  | "leaderboard"
  | "search_builders"
  | `talent_protocol_${string}`
  | `talent_protocol_search_${string}`
  | `farcaster_${string}`
  | `farcaster_search_${string}`
  | "users_count"
  | "nominations_count";

export const CACHE_1_MINUTE = 60;
export const CACHE_5_MINUTES = 60 * 5;
export const CACHE_24_HOURS = 60 * 60 * 24;
