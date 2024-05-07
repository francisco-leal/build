import { notFound } from "next/navigation";
import { DailyBudgetCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function DailyBudgetCard() {
  const userStats = await getCurrentUser();
  if (!userStats) return notFound();
  const budget = userStats.boss_budget;
  return <DailyBudgetCardComponent budget={budget} />;
}
