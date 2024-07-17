import { getNominationsCountOverall } from "@/app/_api/data/nominations";
import { getUsersCountOverall } from "@/app/_api/data/users";
import { HomePageComponent } from "./component";

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
