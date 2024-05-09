import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { BuilderScoreCardComponent } from "./component";

export default async function BuilderScoreCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <BuilderScoreCardComponent score={user.passport_builder_score} />;
}
