import { wait } from "@/shared/utils/wait";
import { MyNominationsTableComponent } from "./component";

export default async function MyNominationsTable() {
    // TODO: Implement back end logic here :D
    await wait(1500);

    const values = [
        {
            date: "May 08",
            name: "John Doe",
            rank: 12,
            pointsGiven: 100
        },
        {
            date: "May 09",
            name: "Jane Doe",
            rank: 1,
            pointsGiven: 1000
        },
        {
            date: "May 10",
            name: null,
            rank: null,
            pointsGiven: null,
        },
        {
            date: "May 11",
            name: "Jane Doe",
            rank: 1,
            pointsGiven: 13
        },
        {
            date: "May 12",
            name: "John Doe",
            rank: 12,
            pointsGiven: 1244
        },
        {
            date: "May 13",
            name: "Jane Doe",
            rank: 1,
            pointsGiven: 1000
        }
    ]

    return (<MyNominationsTableComponent values={values} />)
}