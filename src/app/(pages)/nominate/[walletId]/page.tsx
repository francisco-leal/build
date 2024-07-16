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
} from "@/app/_api/data/nominations";
import { getCurrentUser, getUserBalances } from "@/app/_api/data/users";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { ConnectWalletButton } from "@/shared/components/connect-wallet-button";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { formatNumber } from "@/shared/utils/format-number";
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
            { label: "My Weekly Budget", value: "---" },
            { label: "Noms made this week", value: "---" },
            { label: "Points per Nomination", value: "---" },
          ]}
        />
        <ModalActions>
          <ConnectWalletButton />
        </ModalActions>
      </Modal>
    );
  }

  const userBalances = await getUserBalances(currentUser, currentUser.wallet);
  const todaysNominations = await getNominationsFromUserToday(currentUser);
  const sharableWarpcastLink = getWarpcastSharableLinkSingleBuilder(
    builder.username,
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
              value: `${todaysNominations.length}`,
            },
            {
              label: "Points per Nomination",
              value: formatNumber(
                userBalances.budget / (todaysNominations.length + 1),
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
          value: `${todaysNominations.length + 1}`,
        },
        {
          label: "Each nom receives",
          value: formatNumber(
            userBalances.budget / (todaysNominations.length + 1),
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
