import { notFound } from "next/navigation";
import { BossTokensCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function BossTokensCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <BossTokensCardComponent tokens={user.boss_token_balance} />;
}
