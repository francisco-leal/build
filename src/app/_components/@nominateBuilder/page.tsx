import { DateTime } from "luxon";
import { NominateBuilderComponent } from "./component";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { getBuilder } from "@/app/_api/get-builder";

export default async function NominateBuilder({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();
  const nominatedBuilder = await getBuilder(params.userId);

  const date = DateTime.now().toFormat("LLL dd");

  if (!nominatedBuilder) notFound();

  return (
    <NominateBuilderComponent
      connected={currentUser !== null}
      loading={!currentUser}
      date={date}
      nominatedBossProfileImage={nominatedBuilder.image}
      nominatedBossUsername={nominatedBuilder.username}
      nominatedBossAddress={nominatedBuilder.address}
      currentUserDailyBudget={currentUser?.boss_budget}
      currentUserTotalBossPoints={currentUser?.boss_score}
    />
  );
}
