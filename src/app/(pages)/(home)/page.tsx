import { fetchMetadata } from "frames.js/next";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { HomePageComponent } from "./component";
import type { Metadata } from "next";

const description = [
  "BUILD is a meme and a social game designed to reward builders via",
  "onchain nominations.",
].join(" ");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "BUILD",
    description: description,
    openGraph: {
      title: "BUILD",
      description: description,
      type: "website",
      url: "https://build.top",
      images: [
        "https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1",
      ],
    },
    twitter: {
      title: "BUILD",
      description: description,
      images: [
        "https://build-top-images.s3.eu-west-2.amazonaws.com/BUILD-thumbnail.jpg?1",
      ],
    },
    other: {
      ...(await fetchMetadata(new URL(FRAMES_BASE_PATH, appURL())).catch(() => ({}))),
    },
  };
}

export default async function HomePage() {
  const leaderboard = await getTableLeaderboardValues();
  return (
    <HomePageComponent key={"home"} tableLeaderboardValues={leaderboard} />
  );
}
