import { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import NominateBuilder from "@/app/_modals/nominate-builder/page";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";

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

export default NominateBuilder;

export const dynamic = "force-dynamic";
