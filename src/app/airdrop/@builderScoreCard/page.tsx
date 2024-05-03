import { BuilderScoreCardComponent } from "./component";
import { wait } from "@/shared/utils/wait";

export default async function BuilderScoreCard() {
  // TODO: Implement back end logic here :D
  await wait(1700);

  return <BuilderScoreCardComponent score={85} />;
}
