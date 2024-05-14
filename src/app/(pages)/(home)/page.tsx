//import { getTableLeaderboardValues } from "@/app/_api/get-table-leaderboard-values";
import { TableLeaderboardValue } from "@/app/_components/table-leaderboard";
import { HomePageComponent } from "./component";

export default async function HomePage() {
  //const leaderboard = await getTableLeaderboardValues();
  const leaderboard : TableLeaderboardValue[] = [
    { name: "limone.eth", buildScore: 96 },
    { name: "Erik Valle", buildScore: 81 },
    { name: "macedo", buildScore: 81 },
    { name: "ruben", buildScore: 79 },
    { name: "leal.eth", buildScore: 76 },
    { name: "juampi", buildScore: 76 },
    { name: "Charakapsa ", buildScore: 73 },
    { name: "Brichis", buildScore: 72 },
  ].map((value, index) => ({
    id: index.toString(),
    rank: (index + 1).toString(),
    name: value.name,
    builderScore: value.buildScore,
    bossScore: 0,
    nominationsReceived: 0,
    highlight: false,
  }));

  return <HomePageComponent tableLeaderboardValues={leaderboard} />;
}
