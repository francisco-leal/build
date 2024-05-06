import { BossPointsCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function BossPoints() {
  const userStats = await getCurrentUserAppStats();
  const points = userStats.nominations;
  return <BossPointsCardComponent points={points} />;
}
