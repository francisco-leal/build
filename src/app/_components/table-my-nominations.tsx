import { FunctionComponent } from "react";
import { Box, Sheet, SheetProps, Skeleton, Table } from "@mui/joy";

export type TableMyNominationsValue = {
  key: string;
  date: string;
  name: string | null;
  rank: number | null;
  pointsGiven: number | null;
  missed?: boolean;
  odd?: boolean;
};

export type MyNominationsTableProps = {
  values?: TableMyNominationsValue[];
  loading?: boolean;
} & SheetProps;

export const TableMyNominations: FunctionComponent<MyNominationsTableProps> = ({
  values = [],
  loading,
  variant = "outlined",
  ...props
}) => (
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
            <Box
              component={"tr"}
              key={`${val.date}-${val.name}`}
              className={[
                val.missed ? "yellow" : "",
                val.odd ? "odd" : ""
              ].join(" ")}
            >
              <td>{val.date}</td>
              <td>{val.missed ? "Missed" : val.name ?? "---"}</td>
              <td>{val.missed ? "Missed" : val.rank ?? "---"}</td>
              <td>{val.missed ? "Missed" : val.pointsGiven ?? "---"}</td>
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
