import { fetchMetadata } from "frames.js/next";
import { getTableLeaderboardValues } from "@/app/_api/functions/get-table-leaderboard-values";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { HomePageComponent } from "./component";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const url = new URL(FRAMES_BASE_PATH, appURL());
  return {
    other: await fetchMetadata(url).catch(() => ({})),
  };
}

export default async function HomePage() {
  const leaderboard = await getTableLeaderboardValues();
  return (
    <HomePageComponent key={"home"} tableLeaderboardValues={leaderboard} />
  );
}

export const dynamic = "force-dynamic";
