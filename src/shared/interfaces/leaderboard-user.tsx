import { LeaderboardData } from "./leaderboard-data";

export interface LeaderboardUser extends LeaderboardData {
  id: number;
  highlight: boolean;
}
