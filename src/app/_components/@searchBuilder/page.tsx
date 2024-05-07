import { getCurrentUser } from "@/app/_api/get-user";
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
  const user = await getCurrentUser();
  const date = DateTime.now().toFormat("LLL dd");

  const shareLink = user
    ? `${process.env.NEXT_PUBLIC_APP_URL}/nominate/${user.wallet}`
    : undefined;

  return (
    <SearchBuilderComponent
      isConnected={!!user}
      shareLink={shareLink}
      date={date}
      dailyBudget={user?.boss_budget}
      totalBossPoints={user?.boss_score}
      {...props}
    />
  );
}
