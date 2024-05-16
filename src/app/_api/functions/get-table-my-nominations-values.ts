import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { TableMyNominationsValue } from "../../_components/table-my-nominations";
import { getNominationsFromUser } from "../data/nominations";
import { getCurrentUser } from "../data/users";

export const getTableMyNominationsValues = async (): Promise<
  TableMyNominationsValue[]
> => {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const nominations = await getNominationsFromUser(user);
  const firstNominationIso = nominations.at(-1)?.createdAt;
  const firstDate = firstNominationIso
    ? DateTime.fromISO(firstNominationIso)
    : DateTime.utc();
  const lastDate = DateTime.utc();

  const numberOfDays = lastDate.diff(firstDate, "days").days;

  // Create table values that exist
  const values = nominations.map(
    (n): TableMyNominationsValue => ({
      key: `${n.createdAt}-${n.destinationWallet}`,
      date: DateTime.fromISO(n.createdAt).toFormat("LLL dd"),
      missed: false,
      name: n.destinationUsername,
      rank: n.destinationRank,
      pointsGiven: n.bossPointsGiven,
    }),
  );

  // Fill in the missing dates
  for (let i = 0; i < numberOfDays; i++) {
    const date = firstDate.plus({ days: i }).toFormat("LLL dd");
    const numberOfEntries = values.filter((v) => v.date === date).length;
    const missingEntries = Math.max(3 - numberOfEntries, 0);
    values.push(
      ...[...Array(missingEntries).keys()].map((k) => ({
        key: `missing-${date}-${k}`,
        date: firstDate.plus({ days: i }).toFormat("LLL dd"),
        missed: true,
        name: null,
        rank: null,
        pointsGiven: null,
      })),
    );
  }

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
