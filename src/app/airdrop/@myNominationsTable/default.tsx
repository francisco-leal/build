import { MyNominationsTableComponent } from "./component";
import { getCurrentUser } from "@/app/_api/get-user";
import { notFound } from "next/navigation";
import { getUserNominations } from "@/app/_api/get-user-nomination";
import { DateTime } from "luxon";

export default async function MyNominationsTable() {
  const user = await getCurrentUser();
  if (!user) notFound();
  const nominations = await getUserNominations(user?.wallet);
  return (
    <MyNominationsTableComponent
      values={nominations.map((nomination) => ({
        date: DateTime.fromISO(nomination.createdAt).toFormat("LLL dd"),
        name: nomination.destinationUsername,
        rank: nomination.destinationRank,
        pointsGiven: nomination.bossPointsGiven,
      }))}
    />
  );
}
