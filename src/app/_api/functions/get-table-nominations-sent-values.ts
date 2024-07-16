import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { TableNominationsSentValue } from "../../_components/table-nominations-sent";
import { getNominationsUserSent } from "../data/nominations";
import { getCurrentUser } from "../data/users";

export const getTableNominationsSentValues = async (): Promise<
  TableNominationsSentValue[]
> => {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const nominations = await getNominationsUserSent(user);

  // Create table values that exist
  const values = nominations.map(
    (n): TableNominationsSentValue => ({
      key: `${n.createdAt}-${n.destinationWallet}`,
      date: DateTime.fromISO(n.createdAt).toFormat("LLL dd"),
      missed: false,
      name: n.destinationUsername,
      rank: n.destinationRank,
      pointsGiven: n.buildPointsSent,
      wallet: n.destinationWallet,
    }),
  );

  // Sort the table by date
  const sortedValues = values.toSorted((a, b) => {
    const dateA = DateTime.fromFormat(a.date, "LLL dd");
    const dateB = DateTime.fromFormat(b.date, "LLL dd");
    return dateB.toMillis() - dateA.toMillis();
  });

  // Add background color, based on date
  sortedValues.forEach((val, i, arr) => {
    const previous = arr[i - 1];
    if (!previous) return;
    val.odd = previous.date === val.date ? previous.odd : !previous.odd;
  });

  return sortedValues;
};
