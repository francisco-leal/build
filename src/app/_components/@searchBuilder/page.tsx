import { getCurrentUser } from "@/app/_api/get-user";
import { SearchBuilderComponent } from "./component";
import { DateTime } from "luxon";

export default async function SearchBuilders() {
  const user = await getCurrentUser();
  const date = DateTime.now().toFormat("LLL dd");

  return (
    <SearchBuilderComponent
      date={date}
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
