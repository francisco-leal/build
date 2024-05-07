import { notFound } from "next/navigation";
import { DailyStreakCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function DailyBudgetCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <DailyStreakCardComponent streak={user.boss_nomination_streak} />;
}
