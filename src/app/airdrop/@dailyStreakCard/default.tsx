import { notFound } from "next/navigation";
import { DailyStreakCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function DailyBudgetCard() {
  const userStats = await getCurrentUser();
  if (!userStats) return notFound();
  const streak = userStats.boss_nomination_streak;
  return <DailyStreakCardComponent streak={streak} />;
}
