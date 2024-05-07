import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";
import {
  SearchBuilderComponentProps,
  SearchBuilderComponent,
} from "./component";
import { DateTime } from "luxon";

export type SearchBuildersProps = Omit<
  SearchBuilderComponentProps,
  "shareLink" | "date" | "dailyBudget" | "totalBossPoints" | "isConnected"
>;

export default async function SearchBuilders(props: SearchBuildersProps) {
  const user = await getCurrentUserAppStats().catch(() => null);
  const date = DateTime.now().toFormat("LLL dd");

  const shareLink = user
    ? // TODO missing wallet address here!!!
      `${process.env.NEXT_PUBLIC_APP_URL}/nominate/${user.boss_budget}`
    : undefined;

  return (
    <SearchBuilderComponent
      isConnected={!!user}
      shareLink={shareLink}
      date={date}
      // TODO: map the correct values here!
      dailyBudget={user?.boss_budget}
      totalBossPoints={user?.boss_score}
      {...props}
    />
  );
}
