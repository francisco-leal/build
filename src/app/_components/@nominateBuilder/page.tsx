import { DateTime } from "luxon";
import { NominateBuilderComponent } from "./component";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { getBuilder } from "@/app/_api/get-builder";
import { getCurrentUserNomination } from "@/app/_api/get-user-nomination";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
export default async function NominateBuilder({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();
  const currentUserNomination = await getCurrentUserNomination();
  const builder = await getBuilder(params.userId);

  const date = DateTime.now().toFormat("LLL dd");

  if (!builder) notFound();

  return (
    <NominateBuilderComponent
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
