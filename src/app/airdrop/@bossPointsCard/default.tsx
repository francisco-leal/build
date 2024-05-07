import { notFound } from "next/navigation";
import { BossPointsCardComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";

export default async function BossPoints() {
  const userStats = await getCurrentUser();
  if (!userStats) return notFound();
  const points = userStats.passport_builder_score;
  return <BossPointsCardComponent points={points} />;
}
