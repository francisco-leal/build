import { BossPointsCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function BossPoints() {
  const user = await getCurrentUserAppStats();
  const points = user.boss_score ?? 0;
  return <BossPointsCardComponent points={points} />;
}
