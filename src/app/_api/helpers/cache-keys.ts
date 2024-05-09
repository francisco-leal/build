export type CacheKey =
  | `user_${string}`
  // TODO remove this, add just nominations, and adapt query keys
  | `user_${string}_nominations`
  | `user_${string}_nominates_${string}`
  | "leaderboard"
  | "leaderboard_top_10"
  | "search_builders";

export const CACHE_5_MINUTES = 60 * 5;
export const CACHE_24_HOURS = 60 * 60 * 24;
