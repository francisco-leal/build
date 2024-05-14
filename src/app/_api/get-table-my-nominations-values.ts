import { notFound } from "next/navigation";
import { DateTime } from "luxon";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { makeMap } from "@/shared/utils/make-map";
import { TableMyNominationsValue } from "../_components/table-my-nominations";
import { getNominationsFromWallet } from "./get-nomination";
import { getCurrentUser } from "./get-user";

export const getTableMyNominationsValues = async (): Promise<
  TableMyNominationsValue[]
> => {
  const user = await getCurrentUser();
  if (!user) return notFound();
  const nominations = await getNominationsFromWallet(user.wallet);
  const lastNominationIso = nominations.at(0)?.createdAt;
  const firstNominationIso = nominations.at(-1)?.createdAt;
  const firstDate = firstNominationIso
    ? DateTime.fromISO(firstNominationIso)
    : DateTime.now();
  const lastDate = lastNominationIso
    ? DateTime.fromISO(lastNominationIso)
    : DateTime.now();

  const numberOfDays = lastDate.diff(firstDate, "days").days;

  // Create table values that exist
  const values = nominations.map(
    (n): TableMyNominationsValue => ({
      date: DateTime.fromISO(n.createdAt).toFormat("LLL dd"),
      missed: false,
      name:
        n.destinationUsername ?? abbreviateWalletAddress(n.destinationWallet),
      rank: n.destinationRank,
      pointsGiven: n.bossPointsGiven,
    }),
  );

  // Map marking dates present in the table
  const valuesMap = makeMap(values, (n) => n.date);

  // Fill in the missing dates
  for (let i = 0; i < numberOfDays; i++) {
    const date = lastDate.plus({ days: i }).toFormat("LLL dd");
    if (valuesMap[date]) continue;
    values.push({
      date: lastDate.plus({ days: i }).toFormat("LLL dd"),
      missed: true,
      name: null,
      rank: null,
      pointsGiven: null,
    });
  }

  // Sort the table by date
  const sortedValues = values.toSorted((a, b) => {
    const dateA = DateTime.fromFormat(a.date, "LLL dd");
    const dateB = DateTime.fromFormat(b.date, "LLL dd");
    return dateA.toMillis() - dateB.toMillis();
  });

  return sortedValues;
};
