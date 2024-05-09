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
  hasExceededNominationsToday,
  isDuplicateNomination,
  isSelfNomination,
} from "@/app/_api/create-new-nomination";
import { getNomination } from "@/app/_api/get-nomination";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { NotFoundError } from "@/shared/utils/error";

type StateAndInfo = {
  state: NominationState;
  infoMessage: ReactNode;
};

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

  const balances = currentUser
    ? await getBossNominationBalances(currentUser.wallet)
    : undefined;

  const { state, infoMessage }: StateAndInfo = await (async () => {
    if (!currentUser) {
      return {
        state: "NOT_CONNECTED" as const,
        infoMessage: (
          <Typography level="body-sm" textAlign={"center"} sx={{ mr: 1 }}>
            You need to connect your wallet to nominate a builder.
          </Typography>
        ),
      };
    }
    if (await isSelfNomination(currentUser.wallet, builder.wallet)) {
      return {
        state: "INVALID_NOMINATION" as const,
        infoMessage: (
          <>
            <Typography level="body-sm" textAlign={"center"} sx={{ mr: 1 }}>
              You are trying to nominate yourself!
              <br />
              Be a good sport and nominate someone else.
            </Typography>
          </>
        ),
      };
    }
    if (await isDuplicateNomination(currentUser.wallet, builder.wallet)) {
      const nomination = await getNomination(
        currentUser.wallet,
        builder.wallet,
      );

      if (!nomination) throw new NotFoundError("Nomination not found");
      const abbreviatedWallet = abbreviateWalletAddress(currentUser.wallet);
      const displayName = nomination.destinationUsername ?? abbreviatedWallet;
      const date = DateTime.fromISO(nomination.createdAt);
      const isToday = date.hasSame(DateTime.now(), "day");
      const displayDate = isToday ? "today" : `on ${date.toFormat("LLL dd")}`;

      return {
        state: "INVALID_NOMINATION" as const,
        infoMessage: (
          <>
            You already nominated <b>{displayName}</b> {displayDate}!<br />
            You can only nominate a builder once.
          </>
        ),
      };
    }
    if (await hasExceededNominationsToday(currentUser.wallet)) {
      return {
        state: "INVALID_NOMINATION" as const,
        infoMessage: (
          <>
            You already nominated 3 builders today! <br />
            Come back tomorrow!
          </>
        ),
      };
    }
    return {
      state: "VALID_NOMINATION" as const,
      infoMessage: "",
    };
  })();

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
