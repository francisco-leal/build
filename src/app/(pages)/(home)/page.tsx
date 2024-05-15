import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { HomePageComponent } from "./component";

export default async function HomePageLayout() {
  const leaderboard = await getTableLeaderboardValues();
  return <HomePageComponent tableLeaderboardValues={leaderboard} />;
}
