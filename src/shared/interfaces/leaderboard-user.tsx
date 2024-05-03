import { Tables } from "@/db/database.types";

export interface LeaderboardUser extends Tables<"app_leaderboard_current"> {
  id: number;
  highlight: boolean;
}
