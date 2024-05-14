import { ReactNode } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Typography } from "@mui/joy";
import { DateTime } from "luxon";
import {
  getBossNominationBalances,
  getTodaysNominations,
  hasExceededNominationsToday,
  isDuplicateNomination,
  isSelfNomination,
  isUpdatingLeaderboard,
} from "@/app/_api/create-new-nomination";
import { getWalletInfo } from "@/app/_api/get-wallet-info";
import { getNomination } from "@/app/_api/get-nomination";
import { getCurrentUser } from "@/app/_api/get-user";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { NotFoundError } from "@/shared/utils/error";
import { NominateBuilderComponent, NominationState } from "./component";

type StateAndInfo = {
  state: NominationState;
  infoMessage: ReactNode;
};

export default async function NominateBuilder({
  params,
}: {
  params: { walletId: string };
}) {
  const builder = await getWalletInfo(params.walletId);
  const currentUser = await getCurrentUser();
  const todaysNominations = currentUser
    ? await getTodaysNominations(currentUser.wallet)
    : undefined;

  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "boss.community";
  const isBackAvailable = referer.includes(appUrl);
  const date = DateTime.now().toFormat("LLL dd");

  if (!builder || !builder.wallet) notFound();

  const balances = currentUser
    ? await getBossNominationBalances(currentUser.wallet)
    : undefined;

  const { state, infoMessage }: StateAndInfo = await (async () => {
    if (!currentUser) {
      return {
        state: "NOT_CONNECTED" as const,
        infoMessage: "",
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

      return {
        state: "ALREADY_NOMINATED" as const,
        infoMessage: (
          <>
            You nominated {displayName}!<br />
            <small>(You can only nominate each builder once)</small>
          </>
        ),
      };
    }
    if (await isSelfNomination(currentUser, builder)) {
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
    if (await isUpdatingLeaderboard()) {
      return {
        state: "INVALID_NOMINATION" as const,
        infoMessage: (
          <>
            <Typography level="body-sm" textAlign={"center"} sx={{ mr: 1 }}>
              Leaderboard is currently updating. This should only take a minute
              or two...
            </Typography>
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
      currentUserBossDailyNominations={todaysNominations?.length ?? 0}
    />
  );
}
