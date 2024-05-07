import { getCurrentUser } from "@/app/_api/get-user";
import { BuilderScoreCardComponent } from "./component";
import { notFound } from "next/navigation";

export default async function BuilderScoreCard() {
  const userStats = await getCurrentUser();
  if (!userStats) return notFound();
  const score = userStats.boss_token_balance;
  return <BuilderScoreCardComponent score={score} />;
}
