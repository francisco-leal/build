import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Link } from "@mui/joy";
import { DateTime } from "luxon";
import {
  getNominationThisWeek,
  getNominationsFromUserThisWeek,
  hasNoDailyBudget,
  isSelfNomination,
} from "@/app/_api/data/nominations";
import { getCurrentUser, getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { formatNumber } from "@/shared/utils/format-number";
import { getWarpcastSharableLinkSingleBuilder } from "@/shared/utils/sharable-warpcast-link";
import {
  Modal,
  ModalActionMessage,
  ModalActions,
  ModalBuilderProfile,
  ModalGoBackButton,
  ModalNominationValues,
  ModalRecalculateButton,
  ModalSubmitButton,
} from "./components";

export default async function NominateBuilder({
  params,
}: {
  params: { walletId: string };
}) {
  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "build.top";
  const disableGoBack = !referer.includes(appUrl);
  const today = DateTime.now().toFormat("LLL dd");

  let builder;
  try {
    builder = await getWalletFromExternal(params.walletId);
  } catch (error) {
    notFound();
  }
  if (!builder || !builder.wallet) notFound();

  const builderProfile = (
    <ModalBuilderProfile
      builderRank={builder.rank}
      builderImage={builder.image}
      builderUsername={builder.username}
      builderWallet={builder.wallet}
      builderTalentId={builder.passportId}
      builderFarcasterUsername={
        builder.farcasterId ? builder.username : undefined
      }
    />
  );

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
        {builderProfile}
        <ModalNominationValues
          entries={[
            { label: "Date", value: today },
            { label: "My Weekly Budget", value: "---" },
            { label: "Noms made this week", value: "---" },
            { label: "Points per Nomination", value: "---" },
          ]}
        />
        <ModalActions>
          <ConnectWalletButton forceRefreshOnConnect={true} />
        </ModalActions>
      </Modal>
    );
  }

  let userBalances;
  try {
    userBalances = await getUserBalances(currentUser, currentUser.wallet);
  } catch (e: any) {
    return (
      <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
        {builderProfile}
        <ModalNominationValues
          entries={[
            { label: "Date", value: today },
            { label: "My Weekly Budget", value: "---" },
            { label: "Noms made this week", value: "---" },
            { label: "Points per Nomination", value: "---" },
          ]}
        />
        <ModalActions>
          <ModalActionMessage>{e.message}</ModalActionMessage>
        </ModalActions>
      </Modal>
    );
  }

  const nominationsThisWeek = await getNominationsFromUserThisWeek(currentUser);
  const sharableWarpcastLink = getWarpcastSharableLinkSingleBuilder(
    builder.username,
  );
  const previousNomination = await getNominationThisWeek(currentUser, builder);
  if (previousNomination) {
    const previousDate = DateTime.fromISO(previousNomination.createdAt);
    return (
      <Modal title="Nominated Builder" disableGoBack={disableGoBack}>
        {builderProfile}
        <ModalNominationValues
          entries={[
            {
              label: "Date",
              value: previousDate.toFormat("LLL dd"),
            },
            {
              label: "Points given",
              value: formatNumber(previousNomination.buildPointsSent),
            },
          ]}
        />
        <ModalActions>
          <ModalActionMessage>
            You nominated {builder.username}!<br />
            <Link href={sharableWarpcastLink} target="_blank">
              Share on Farcaster
            </Link>
          </ModalActionMessage>
        </ModalActions>
      </Modal>
    );
  }

  if (await isSelfNomination(currentUser, builder)) {
    return (
      <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
        {builderProfile}
        <ModalNominationValues
          entries={[
            {
              label: "Date",
              value: today,
            },
            {
              label: "My Weekly Budget",
              value: formatNumber(userBalances.budget),
            },
            {
              label: "Noms made this week",
              value: `${nominationsThisWeek.length}`,
            },
            {
              label: "Points per Nomination",
              value: formatNumber(
                userBalances.budget / (nominationsThisWeek.length + 1),
              ),
            },
          ]}
        />
        <ModalActions>
          <ModalActionMessage sx={{ textAlign: "right" }}>
            You are trying to nominate yourself!
            <br />
            Be a good sport and nominate someone else.
          </ModalActionMessage>
          <ModalGoBackButton disableGoBack={disableGoBack}>
            Close
          </ModalGoBackButton>
        </ModalActions>
      </Modal>
    );
  }

  const nominationValues = (
    <ModalNominationValues
      entries={[
        {
          label: "Date",
          value: today,
        },
        {
          label: "My weekly budget",
          value: formatNumber(userBalances.budget, 0),
        },
        {
          label: "Nominations this week",
          value: `${nominationsThisWeek.length}`,
        },
        {
          label: "Each nom receives",
          value: formatNumber(
            userBalances.budget / (nominationsThisWeek.length + 1),
            0,
          ),
        },
      ]}
    />
  );

  if (await hasNoDailyBudget(currentUser)) {
    return (
      <Modal title="Nominate Builder">
        {builderProfile}
        {nominationValues}
        <ModalActions>
          <ModalActionMessage>
            You don&apos;t seem to have a BUILD weekly budget yet. Click the
            button to force a recalculation
          </ModalActionMessage>
          <ModalRecalculateButton user={currentUser} />
        </ModalActions>
      </Modal>
    );
  }

  return (
    <Modal title="Nominate Builder">
      {builderProfile}
      {nominationValues}
      <ModalActions>
        <ModalGoBackButton disableGoBack={disableGoBack}>
          Close
        </ModalGoBackButton>
        <ModalSubmitButton wallet={builder.wallet} />
      </ModalActions>
    </Modal>
  );
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
