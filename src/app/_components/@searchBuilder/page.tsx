import { getCurrentUser } from "@/app/_api/get-user";
import { SearchBuilderComponent } from "./component";
import { DateTime } from "luxon";

export default async function SearchBuilders() {
  const user = await getCurrentUser();
  const date = DateTime.now().toFormat("LLL dd");

  const shareLink = user
    ? `${process.env.NEXT_PUBLIC_APP_URL}/nominate/${user.wallet}`
    : undefined;

  return (
    <SearchBuilderComponent
      isConnected={!!user}
      date={date}
      shareLink={shareLink}
      dailyBudget={user?.boss_budget}
      sx={{
        mt: 1,
        alignItems: "center",
        width: "100%",
        height: 280,
      }}
    />
  );
}
