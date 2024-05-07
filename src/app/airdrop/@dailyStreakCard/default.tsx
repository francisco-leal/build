import { DailyStreakCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function DailyBudgetCard() {
  const user = await getCurrentUserAppStats();
  const streak = user.boss_nomination_streak ?? 0;
  return <DailyStreakCardComponent streak={streak} />;
}
