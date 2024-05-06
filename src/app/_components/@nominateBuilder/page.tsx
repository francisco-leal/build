import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";
import { DateTime } from "luxon";
import { NominateBuilderComponent } from "./component";
import { getBuilderProfile } from "@/app/_api/get-builder-profile";
import { wait } from "@/shared/utils/wait";
import { notFound } from "next/navigation";

export default async function NominateBuilder({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUserAppStats().catch(() => null);
  const nominatedBuilder = await getBuilderProfile(params.userId);

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
