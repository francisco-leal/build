import { wait } from "@/shared/utils/wait";
import { BossTokensCardComponent } from "./component";

export default async function BossTokensCard () {
    // TODO: Implement back end logic here :D
    await wait(1700);
    
    return (
        <BossTokensCardComponent tokens={12.241} />
    )
}