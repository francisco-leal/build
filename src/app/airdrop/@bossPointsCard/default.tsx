import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { BossPointsCardComponent } from "./component";

export default async function BossPoints() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <BossPointsCardComponent points={user.boss_score} />;
}
