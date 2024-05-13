import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { DailyStreakCardComponent } from "./component";

export default async function DailyBudgetCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const isSingular = user.boss_nomination_streak === 1;
  const streak = `${user.boss_nomination_streak} day${isSingular ? "" : "s"}`;
  return <DailyStreakCardComponent streak={streak} />;
}
