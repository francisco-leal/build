import { notFound } from "next/navigation";
import { BossPointsCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function BossPoints() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <BossPointsCardComponent points={user.boss_score} />;
}
