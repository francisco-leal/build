import { wait } from "@/shared/utils/wait";
import { DailyStreakCardComponent } from "./component";

export default async function DailyBudgetCard() {
  // TODO: Implement back end logic here :D
  await wait(2000);

  return <DailyStreakCardComponent streak={"5 days"} />;
}
