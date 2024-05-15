import { ReactNode } from "react";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Typography } from "@mui/joy";
import { DateTime } from "luxon";
import {
  getNomination,
  getNominationsFromUserToday,
  hasExceededNominationsToday,
  isDuplicateNomination,
  isSelfNomination,
  isUpdatingLeaderboard,
} from "@/app/_api/data/nominations";
import { getCurrentUser, getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
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
  const builder = await getWalletFromExternal(params.walletId);
  if (!builder || !builder.wallet) notFound();

  const currentUser = await getCurrentUser();

  const todaysNominations = currentUser
    ? await getNominationsFromUserToday(currentUser)
    : undefined;
  const userBalances = currentUser
    ? await getUserBalances(currentUser)
    : undefined;

  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "build.top";
  const isBackAvailable = referer.includes(appUrl);
  const date = DateTime.now().toFormat("LLL dd");

  const { state, infoMessage }: StateAndInfo = await (async () => {
    if (!currentUser) {
      return {
        state: "NOT_CONNECTED" as const,
        infoMessage: "",
      };
    }
    if (await isDuplicateNomination(currentUser, builder)) {
      const nomination = await getNomination(currentUser, builder);
      if (!nomination) throw new NotFoundError("Nomination not found");
      const abbreviatedWallet = abbreviateWalletAddress(builder.wallet);
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
    if (await hasExceededNominationsToday(currentUser)) {
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
      currentUserBossDailyBudget={userBalances?.dailyBudget ?? 0}
      currentUserBossPointsToBeGiven={userBalances?.pointsGiven ?? 0}
      currentUserBossPointsToBeEarned={userBalances?.pointsEarned ?? 0}
      currentUserBossDailyNominations={todaysNominations?.length ?? 0}
    />
  );
}
