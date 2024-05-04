import { Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { FunctionComponent } from "react";

export type LeaderboardTableValue = {
  id: string;
  rank: string;
  name: string;
  builderScore: number;
  nominationsReceived: number;
  highlight: boolean;
};

export type LeaderboardTableProps = {
  values?: LeaderboardTableValue[];
  loading?: boolean;
} & SheetProps;

export const LeaderboardTable: FunctionComponent<
  LeaderboardTableProps
> = ({ values = [], loading, variant = "outlined", ...props }) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Builder Score</th>
          <th>BOSS Points</th>
          <th>Nominations Received</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val) => (
            <tr key={val.id} className={val.highlight ? "blue" : ""}>
              <td>{val.rank}</td>
              <td>{val.name ?? "Missed"}</td>
              <td>{val.builderScore ?? "Missed"}</td>
              <td>{val.nominationsReceived ?? "Missed"}</td>
              <td>{val.highlight}</td>
            </tr>
          ))}
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
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
