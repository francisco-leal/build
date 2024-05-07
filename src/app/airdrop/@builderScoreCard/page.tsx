import { getCurrentUser } from "@/app/_api/get-user";
import { BuilderScoreCardComponent } from "./component";
import { notFound } from "next/navigation";

export default async function BuilderScoreCard() {
  const user = await getCurrentUser();
  if (!user) return notFound();
  return <BuilderScoreCardComponent score={user.passport_builder_score} />;
}
