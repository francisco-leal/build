import { FunctionComponent } from "react";
import { Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { FarcasterLink } from "@/shared/components/farcaster-link";
import { TalentProtocolLink } from "@/shared/components/talentprotocol-link";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type TableLeaderboardValue = {
  id: string;
  rank: string;
  name: string;
  builderScore: number;
  bossScore: number;
  nominationsReceived: number;
  highlight: boolean;
  farcaster_id?: number;
  passport_id?: number;
};

export type LeaderboardTableProps = {
  values?: TableLeaderboardValue[];
  loading?: boolean;
} & SheetProps;

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
          <th>Build Points</th>
          <th>Nominations</th>
          <th>Builder Score</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val) => (
            <tr key={val.id} className={val.highlight ? "blue" : ""}>
              <td>{val.rank}</td>
              <td
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <TalentProtocolLink passport_id={val.passport_id} />{" "}
                <FarcasterLink
                  farcaster_id={val.farcaster_id}
                  username={val.name}
                />
                {abbreviateWalletAddress(val.name)}{" "}
              </td>
              <td>{formatLargeNumber(val.bossScore)}</td>
              <td>{val.nominationsReceived}</td>
              <td>{Math.round(val.builderScore)}</td>
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
