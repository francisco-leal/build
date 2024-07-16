import { fetchMetadata } from "frames.js/next";
import { getNominationsCountOverall } from "@/app/_api/data/nominations";
import { getUsersCountOverall } from "@/app/_api/data/users";
import { FRAMES_BASE_PATH, appURL } from "@/shared/frames/utils";
import { HomePageComponent } from "./component";
import type { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   const url = new URL(FRAMES_BASE_PATH, appURL());
//   return {
//     other: await fetchMetadata(url).catch(() => ({})),
//   };
// }

export default async function HomePage() {
  const nominationsCount = await getNominationsCountOverall();
  const usersCount = await getUsersCountOverall();
  return (
    <HomePageComponent
      key={"home"}
      nominationsCount={nominationsCount}
      usersCount={usersCount}
    />
  );
}

export const dynamic = "force-dynamic";
