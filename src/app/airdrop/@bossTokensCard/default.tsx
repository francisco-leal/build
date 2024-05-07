import { notFound } from "next/navigation";
import { BossTokensCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function BossTokensCard() {
  const userStats = await getCurrentUser();
  if (!userStats) return notFound();
  const tokens = userStats.boss_token_balance;
  return <BossTokensCardComponent tokens={tokens} />;
}
