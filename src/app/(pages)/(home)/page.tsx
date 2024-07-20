import { getNominationsCountOverall } from "@/app/_api/data/nominations";
import { getUsersCountOverall } from "@/app/_api/data/users";
import { getFollowerCount } from "@/app/_api/external/farcaster";
import { HomePageComponent } from "./component";

export default async function HomePage() {
  const nominationsCount = await getNominationsCountOverall();
  const usersCount = await getUsersCountOverall();
  const followersCount = await getFollowerCount();
  return (
    <HomePageComponent
      key={"home"}
      nominationsCount={nominationsCount}
      usersCount={usersCount}
      followersCount={followersCount}
    />
  );
}

export const dynamic = "force-dynamic";
