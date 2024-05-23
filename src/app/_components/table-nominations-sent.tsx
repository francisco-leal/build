import { FunctionComponent } from "react";
import { default as NextLink } from "next/link";
import { Box, Link, Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type TableNominationsSentValue = {
  key: string;
  date: string;
  name: string;
  wallet: string;
  pointsGiven: number;
  rank: number | null;
  missed?: boolean;
  odd?: boolean;
};

export type TableNominationsSentProps = {
  values?: TableNominationsSentValue[];
  loading?: boolean;
} & SheetProps;

export const TableNominationsSent: FunctionComponent<
  TableNominationsSentProps
> = ({ values = [], loading, variant = "outlined", ...props }) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Rank</th>
          <th>Points Sent</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val) => (
            <Box
              component={"tr"}
              key={val.key}
              className={[
                val.missed ? "yellow" : "",
                val.odd ? "odd" : "",
              ].join(" ")}
            >
              <td>{val.date}</td>
              {val.missed ? (
                <>
                  <td>Missed</td>
                  <td>---</td>
                  <td>---</td>
                </>
              ) : (
                <>
                  <td>
                    <Link
                      component={NextLink}
                      href={`/nominate/${val.wallet}`}
                      scroll={false}
                    >
                      {abbreviateWalletAddress(val.name)}
                    </Link>
                  </td>
                  <td>{val.rank ?? "---"}</td>
                  <td>{formatLargeNumber(val.pointsGiven ?? 0)}</td>
                </>
              )}
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
