import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { HomePageComponent } from "./component";

export default async function HomePage() {
  const leaderboard = await getTableLeaderboardValues();
  return (
    <HomePageComponent key={"home"} tableLeaderboardValues={leaderboard} />
  );
}
