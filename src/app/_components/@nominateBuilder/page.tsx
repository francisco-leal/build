import { DateTime } from "luxon";
import { NominateBuilderComponent, NominationState } from "./component";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/app/_api/get-user";
import { getBuilder } from "@/app/_api/get-builder";
import { headers } from "next/headers";
import { ReactNode } from "react";
import { Typography } from "@mui/joy";
import {
  getBossNominationBalances,
  getNominatedUser,
  hasExceededNominationsToday,
  isDuplicateNomination,
  isSelfNomination,
} from "@/app/_api/create-new-nomination";

export default async function NominateBuilder({
  params,
}: {
  params: { userId: string };
}) {
  const builder = await getBuilder(params.userId);
  const currentUser = await getCurrentUser();

  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "boss.community";
  const isBackAvailable = referer.includes(appUrl);
  const date = DateTime.now().toFormat("LLL dd");

  if (!builder) notFound();

  const [state, infoMessage]: [NominationState, ReactNode] =
    await (async () => {
      if (!currentUser) {
        return ["NOT_CONNECTED", ""] as const;
      }
      if (await isSelfNomination(currentUser.wallet, builder.wallet)) {
        return [
          "INVALID_NOMINATION",
          <Typography level="body-sm" textAlign={"right"} sx={{ mr: 1 }}>
            You are trying to nominate yourself!
            <br />
            Be a good sport and nominate someone else.
          </Typography>,
        ] as const;
      }
      if (await isDuplicateNomination(currentUser.wallet, builder.wallet)) {
        return [
          "INVALID_NOMINATION",
          <Typography level="body-sm" textAlign={"right"} sx={{ mr: 1 }}>
            You have already nominated this builder before. <br />
            You can only nominate a builder once.
          </Typography>,
        ] as const;
      }
      if (await hasExceededNominationsToday(currentUser.wallet)) {
        return [
          "INVALID_NOMINATION",
          <Typography level="body-sm" textAlign={"right"} sx={{ mr: 1 }}>
            You already nominated 3 builders today! <br />
            Come back tomorrow!
          </Typography>,
        ] as const;
      }
      return ["VALID_NOMINATION", ""] as const;
    })();

  const balances = currentUser
    ? await getBossNominationBalances(currentUser.wallet)
    : undefined;

  console.log(state);

  return (
    <NominateBuilderComponent
      state={state}
      infoMessage={infoMessage}
      backAvailable={isBackAvailable}
      date={date}
      builderImage={builder.image}
      builderUsername={builder.username}
      builderWallet={builder.wallet}
      currentUserBossDailyBudget={balances?.dailyBudget ?? 0}
      currentUserBossPointsToBeGiven={balances?.pointsGiven ?? 0}
      currentUserBossPointsToBeEarned={balances?.pointsEarned ?? 0}
      currentUserBossTotalPoints={balances?.totalPoints ?? 0}
    />
  );
}
