import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";
import { BuilderScoreCardComponent } from "./component";

export default async function BuilderScoreCard() {
  const userStats = await getCurrentUserAppStats();
  const score = userStats.boss_score;
  return <BuilderScoreCardComponent score={score} />;
}
