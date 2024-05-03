import { wait } from "@/shared/utils/wait";
import { BossPointsCardComponent } from "./component";

export default async function BossPoints() {
  // TODO: Implement back end logic here :D
  await wait(1700);

  return <BossPointsCardComponent points={12.241} />;
}
