import { DailyBudgetCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function DailyBudgetCard() {
  const userStats = await getCurrentUserAppStats();
  const budget = userStats.boss_budget;
  return <DailyBudgetCardComponent budget={budget} />;
}
