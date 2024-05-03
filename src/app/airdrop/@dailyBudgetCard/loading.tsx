import { Skeleton } from "@mui/joy";
import { DailyBudgetCardComponent } from "./component";

export default function DailyBudgetLoadingCard() {
    return (
        <DailyBudgetCardComponent budget={"---"} />
    )
}