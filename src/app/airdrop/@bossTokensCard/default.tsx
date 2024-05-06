import { BossTokensCardComponent } from "./component";
import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";

export default async function BossTokensCard() {
  const userStats = await getCurrentUserAppStats();
  const tokens = userStats.boss_token_balance;
  return <BossTokensCardComponent tokens={tokens} />;
}
