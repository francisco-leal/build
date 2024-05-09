import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { DailyBudgetCardComponent } from "./component";

export default async function DailyBudgetCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <DailyBudgetCardComponent budget={user.boss_budget} />;
}
