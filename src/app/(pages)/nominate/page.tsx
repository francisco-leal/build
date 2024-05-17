import { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import Nothing from "@/app/@modal/default";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";

const description = [
  "BUILD is a meme and a social game designed to reward builders via",
  "onchain nominations.",
].join(" ");

export async function generateMetadata({
  params: { walletId },
}: {
  params: { walletId: string };
}): Promise<Metadata> {
  return {
    title: "BUILD",
    description: description,
    openGraph: {
      title: "BUILD",
      description: description,
      type: "website",
      url: "https://build.top",
      images: ["https://build.top/images/BUILD-thumbnail.jpg"],
    },
    other: {
      ...(await fetchMetadata(
        new URL(FRAMES_BASE_PATH + `/nominate`, appURL()),
      )),
    },
  };
}

export default Nothing;
