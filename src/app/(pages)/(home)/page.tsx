import { getTableLeaderboardValues } from "@/app/_api/get-table-leaderboard-values";
import { HomePageComponent } from "./component";

export default async function HomePage() {
  const leaderboard = await getTableLeaderboardValues();
  return <HomePageComponent tableLeaderboardValues={leaderboard} />;
}
