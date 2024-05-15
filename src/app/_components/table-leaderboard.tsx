import { FunctionComponent } from "react";
import { Sheet, SheetProps, Skeleton, Table } from "@mui/joy";

export type TableLeaderboardValue = {
  id: string;
  rank: string;
  name: string;
  builderScore: number;
  bossScore: number;
  nominationsReceived: number;
  highlight: boolean;
};

export type LeaderboardTableProps = {
  values?: TableLeaderboardValue[];
  loading?: boolean;
} & SheetProps;

const shortenWallet = (wallet: string) => {
  if (!wallet) return "";
  if (wallet.includes("0x"))
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  return wallet;
};

export const TableLeaderboard: FunctionComponent<LeaderboardTableProps> = ({
  values = [],
  loading,
  variant = "outlined",
  ...props
}) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Builder Score</th>
          <th>Build Points</th>
          <th>Nominations Received</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val) => (
            <tr key={val.id} className={val.highlight ? "blue" : ""}>
              <td>{val.rank}</td>
              <td>{shortenWallet(val.name)}</td>
              <td>{val.builderScore}</td>
              <td>{Math.round(val.bossScore)}</td>
              <td>{val.nominationsReceived ?? "Missed"}</td>
            </tr>
          ))}
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <tr key={i}>
              <td colSpan={5}>
                <Skeleton variant="text" />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </Sheet>
);
