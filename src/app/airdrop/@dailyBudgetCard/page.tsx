import { wait } from "@/shared/utils/wait";
import { DailyBudgetCardComponent } from "./component";

export default async function DailyBudgetCard() {
  // TODO: Implement back end logic here :D
  await wait(1500);

  return <DailyBudgetCardComponent budget={100} />;
}
