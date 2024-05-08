import { Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { FunctionComponent } from "react";

export type MyNominationsTableValue = {
  date: string;
  name: string | null;
  rank: number | null;
  pointsGiven: number | null;
};

export type MyNominationsTableProps = {
  values?: MyNominationsTableValue[];
  loading?: boolean;
} & SheetProps;

export const MyNominationsTableComponent: FunctionComponent<
  MyNominationsTableProps
> = ({ values = [], loading, variant = "outlined", ...props }) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Rank</th>
          <th>Build Points Given</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val) => (
            <tr key={val.date} className={val.name ? "" : "yellow"}>
              <td>{val.date}</td>
              <td>{val.name ?? "Missed"}</td>
              <td>{val.rank ?? "Missed"}</td>
              <td>{val.pointsGiven ?? "Missed"}</td>
            </tr>
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
