import { headers } from "next/headers";
import Link, { default as NextLink } from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@mui/joy";
import { fetchMetadata } from "frames.js/next";
import { DateTime } from "luxon";
import { getWalletFromExternal } from "@/app/_api/data/wallets";
import { appURL } from "@/shared/frames/utils";
import {
  Modal,
  ModalActionMessage,
  ModalActions,
  ModalBuilderProfile,
} from "./components";

export async function generateMetadata({
  params,
}: {
  params: { walletId: string };
}) {
  const walletId = params.walletId;
  return {
    title: "Nominate builders",
    other: {
      ...(await fetchMetadata(new URL(`/frames/${walletId}`, appURL()))),
    },
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

  let sharableTextUriEncoded = `This week I nominate ${builder.wallet} because ...`;
  if (builder?.username) {
    sharableTextUriEncoded = `This week I nominate @${builder.username} because ...`;
  }
  return (
    <Modal title="Nominate Builder" disableGoBack={disableGoBack}>
      {builderProfile}
      <ModalActions>
        <ModalActionMessage>
          We&apos;re testing a new nomination format using Farcaster and{" "}
          <Link href="https://rounds.wtf/build" target="_blank">
            Rounds
          </Link>
          . Click to nominate @{builder.username} in the{" "}
          <Link href="https://warpcast.com/build" target="_blank">
            /build
          </Link>{" "}
          channel
        </ModalActionMessage>
        <Button
          component={NextLink}
          variant="solid"
          target="_blank"
          href={`https://warpcast.com/~/compose?text=${sharableTextUriEncoded}&channelKey=build`}
        >
          Nominate
        </Button>
      </ModalActions>
    </Modal>
  );
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";
