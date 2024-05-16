import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { TableNominationsReceivedValue } from "@/app/_components/table-nominations-recieved";
import { getNominationsUserReceived } from "../data/nominations";
import { getCurrentUser } from "../data/users";

export const getTableNominationsReceivedValues = async (): Promise<
  TableNominationsReceivedValue[]
> => {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const nominations = await getNominationsUserReceived(user);

  const values = nominations.map(
    (n): TableNominationsReceivedValue => ({
      key: `${n.createdAt}-${n.destinationWallet}`,
      date: DateTime.fromISO(n.createdAt).toFormat("LLL dd"),
      missed: false,
      name: n.originUsername,
      pointsGiven: n.bossPointsSent,
      pointsEarned: n.bossPointsReceived,
    }),
  );

  return values;
};
