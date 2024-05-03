import { DailyStreakCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function DailyBudgetCard() {
  const userStats = await getCurrentUserAppStats();
  const streak = userStats.nomination_streak;
  return <DailyStreakCardComponent streak={streak} />;
}
