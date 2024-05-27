import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Button, Grid, Link } from "@mui/joy";
import { fetchMetadata } from "frames.js/next";
import { DateTime } from "luxon";
import {
  getNomination,
  getNominationsFromUserToday,
  hasExceededNominationsToday,
  hasNoDailyBudget,
  isSelfNomination,
  isUpdatingLeaderboard,
} from "@/app/_api/data/nominations";
import { getCurrentUser, getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { formatLargeNumber } from "@/shared/utils/format-number";
import { getWarpcastSharableLinkSingleBuilder } from "@/shared/utils/sharable-warpcast-link";
import {
  Modal,
  ModalActionMessage,
  ModalActions,
  ModalBuilderProfile,
  ModalGoBackButton,
  ModalNominationValues,
  ModalSubmitButton,
} from "./components";

type Props = {
  params: { walletId: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const walletId = params.walletId;
  const url = new URL(FRAMES_BASE_PATH + `/nominate/${walletId}`, appURL());
  return {
    other: await fetchMetadata(url).catch(() => ({})),
  };
}

export default async function NominateBuilder({
  params,
}: {
  params: { walletId: string };
}) {
  const referer = headers().get("referer") ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "build.top";
  const disableGoBack = !referer.includes(appUrl);
  const today = DateTime.now().toFormat("LLL dd");

  const builder = await getWalletFromExternal(params.walletId);
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
            { label: "Points to be given", value: "---" },
            { label: "Points to be earned", value: "---" },
            { label: "Daily Budget", value: "---" },
            { label: "Daily Nominations", value: "---" },
          ]}
        />
        <ModalActions>
          <ConnectWalletButton />
        </ModalActions>
      </Modal>
    );
  }

  const userBalances = await getUserBalances(currentUser);
  const todaysNominations = await getNominationsFromUserToday(currentUser);
  const sharableWarpcastLink = getWarpcastSharableLinkSingleBuilder(
    builder.username,
    currentUser.wallet,
  );
  const previousNomination = await getNomination(currentUser, builder);
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
              value: formatLargeNumber(previousNomination.bossPointsSent),
            },
            {
              label: "Points earned",
              value: formatLargeNumber(previousNomination.bossPointsReceived),
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
              label: "Points to be given",
              value: "---",
            },
            {
              label: "Points to be earned",
              value: "---",
            },
            {
              label: "Daily Budget (Per nomination)",
              value: formatLargeNumber(userBalances.dailyBudget),
            },
            {
              label: "Daily Nominations",
              value: `${todaysNominations.length}/3`,
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
          label: "Points to be given",
          value: formatLargeNumber(userBalances.pointsGiven),
        },
        {
          label: "Points to be earned",
          value: formatLargeNumber(userBalances.pointsEarned),
        },
        {
          label: "Daily Budget (Per nomination)",
          value: formatLargeNumber(userBalances.dailyBudget),
        },
        {
          label: "Daily Nominations",
          value: `${todaysNominations.length}/3`,
        },
      ]}
    />
  );

  if (await hasExceededNominationsToday(currentUser)) {
    return (
      <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
        {builderProfile}
        {nominationValues}
        <ModalActions>
          <ModalActionMessage>
            You already nominated 3 builders today!
            <br />
            Come back tomorrow!
          </ModalActionMessage>
          <ModalGoBackButton disableGoBack={disableGoBack}>
            Close
          </ModalGoBackButton>
        </ModalActions>
      </Modal>
    );
  }

  if (await hasNoDailyBudget(currentUser)) {
    return (
      <Modal title="Nominate Builder">
        {builderProfile}
        {nominationValues}
        <ModalActions>
          <ModalGoBackButton disableGoBack={disableGoBack}>
            Close
          </ModalGoBackButton>
          <ModalActionMessage>
            You don&apos;t have a boss budget. You can increase your budget by
            creating a Talent Passport, or by buying $BOSS.
          </ModalActionMessage>
        </ModalActions>
      </Modal>
    );
  }

  if (await isUpdatingLeaderboard()) {
    return (
      <Modal title="Nominate Builder" pokeForUpdate>
        {builderProfile}
        {nominationValues}
        <ModalActions>
          <ModalActionMessage>
            Leaderboard is currently updating. This should only take a minute or
            two...
          </ModalActionMessage>
          <ModalSubmitButton wallet={builder.wallet} loading />
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
