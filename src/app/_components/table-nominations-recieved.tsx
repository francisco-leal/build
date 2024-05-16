import { FunctionComponent } from "react";
import { Box, Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type TableNominationsReceivedValue = {
  key: string;
  date: string;
  name: string | null;
  pointsEarned: number | null;
  pointsGiven: number | null;
  missed?: boolean;
  odd?: boolean;
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
          <th>Points Sent</th>
          <th>Points Earned</th>
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
                val.odd ? "odd" : "",
              ].join(" ")}
            >
              <td>{val.date}</td>
              <td>{val.missed ? "Missed" : val.name ?? "---"}</td>
              <td>
                {val.missed
                  ? "Missed"
                  : formatLargeNumber(val.pointsGiven ?? 0) ?? "---"}
              </td>
              <td>
                {val.missed
                  ? "Missed"
                  : formatLargeNumber(val.pointsEarned ?? 0) ?? "---"}
              </td>
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
