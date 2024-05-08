import { DateTime } from "luxon";
import { NominateBuilderComponent } from "./component";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { getBuilder } from "@/app/_api/get-builder";
import { getCurrentUserNomination } from "@/app/_api/get-user-nomination";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { headers } from "next/headers";
export default async function NominateBuilder({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();
  const currentUserNomination = await getCurrentUserNomination();
  const builder = await getBuilder(params.userId);

  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "boss.community";
  const isBackAvailable = referer.includes(appUrl);

  const date = DateTime.now().toFormat("LLL dd");

  if (!builder) notFound();

  return (
    <NominateBuilderComponent
      backAvailable={isBackAvailable}
      connected={currentUser !== null}
      date={date}
      builderImage={builder.image}
      builderUsername={builder.username}
      builderWallet={builder.address}
      currentUserDailyBudget={currentUser?.boss_budget}
      currentUserTotalBossPoints={currentUser?.boss_score}
      previouslyNominatedBossUsername={
        currentUserNomination
          ? currentUserNomination.destinationUsername ??
            abbreviateWalletAddress(currentUserNomination?.destinationWallet)
          : undefined
      }
      previouslyNominatedBossWallet={
        currentUserNomination
          ? currentUserNomination?.destinationWallet
          : undefined
      }
    />
  );
}
