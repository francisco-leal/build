import { FunctionComponent } from "react";
import { Box, Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type TableNominationsReceivedValue = {
  key: string;
  date: string;
  name: string | null;
  rank: number | null;
  pointsEarned: number | null;
  pointsGiven: number | null;
};

export type TableNominationsReceivedProps = {
  values?: TableNominationsReceivedValue[];
  loading?: boolean;
} & SheetProps;

export const TableNominationsReceived: FunctionComponent<
  TableNominationsReceivedProps
> = ({ values = [], loading, variant = "outlined", ...props }) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Rank</th>
          <th>Points Earned</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val, i) => (
            <Box component={"tr"} key={val.key} className={i % 2 ? "odd" : ""}>
              <td>{val.date}</td>
              <td>{abbreviateWalletAddress(val.name)}</td>
              <td>{val.rank ?? "---"}</td>
              <td>{formatLargeNumber(val.pointsGiven ?? 0)}</td>
            </Box>
          ))}
        {loading &&
          [1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td colSpan={4}>
                <Skeleton variant="text" />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </Sheet>
);
