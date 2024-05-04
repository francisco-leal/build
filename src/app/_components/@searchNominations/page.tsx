import { getCurrentUserAppStats, isUserConnected } from "@/app/_api/get-app-user-stats";
import { SearchNominationComponentProps, SearchNominationsComponent } from "./component";
import { DateTime } from "luxon";

export type SearchNominationsProps = Omit<
  SearchNominationComponentProps,
  | "shareLink"
  | "date"
  | "dailyBudget"
  | "bossPointsEarned"
  | "bossPointsSent"
  | "totalBossPoints"
>;

export default async function SearchNominations(props: SearchNominationsProps) {
  const user = await getCurrentUserAppStats().catch(() => undefined);
  const date =  DateTime.now().toFormat("LLL dd");
 
  // TODO: map the correct values here!
  const dailyBudget = user?.boss_budget.toString();
  const bossPointsEarned = user?.boss_score.toString();
  const bossPointsSent = user?.boss_token_balance.toString(); 
  const totalBossPoints = user?.boss_budget.toString(); 
  
  // TODO: add logic to generate share link here
  const shareLink = user ? "#" : undefined;
  return <SearchNominationsComponent 
    shareLink={shareLink} 
    date={date}
    dailyBudget={dailyBudget}
    bossPointsEarned={bossPointsEarned}
    bossPointsSent={bossPointsSent}
    totalBossPoints={totalBossPoints}
    {...props} 
  />;
}
