import { getCurrentUserAppStats } from "@/app/_api/get-app-user-stats";
import {
  SearchBuilderComponentProps,
  SearchBuilderComponent,
} from "./component";
import { DateTime } from "luxon";

export type SearchBuildersProps = Omit<
  SearchBuilderComponentProps,
  | "shareLink"
  | "date"
  | "dailyBudget"
  | "bossPointsEarned"
  | "bossPointsSent"
  | "totalBossPoints"
  | "isConnected"
>;

export default async function SearchBuilders(props: SearchBuildersProps) {
  const user = await getCurrentUserAppStats().catch(() => undefined);
  const date = DateTime.now().toFormat("LLL dd");



  const shareLink = new URL("/", process.env.APP_HREF);
  shareLink.searchParams.append("nominate",  user?.id);

  return (
    <SearchBuilderComponent
      isConnected={!!user}
      shareLink={shareLink.toString()}
      date={date}
      // TODO: map the correct values here!
      dailyBudget={user?.boss_budget}
      bossPointsEarned={user?.nominated}
      bossPointsSent={user?.boss_budget}
      totalBossPoints={user?.boss_score}
      {...props}
    />
  );
}
