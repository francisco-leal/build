import { FunctionComponent } from "react";
import { default as NextLink } from "next/link";
import {
  Link,
  Sheet,
  SheetProps,
  Skeleton,
  Stack,
  Table,
  Tooltip,
} from "@mui/joy";
import { FarcasterLink } from "@/shared/components/farcaster-link";
import { TalentProtocolLink } from "@/shared/components/talentprotocol-link";
import { FarcasterPowerBadge } from "@/shared/icons/farcaster-power-user";
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
  farcasterId: number | null;
  passportId: number | null;
  walletAddress: string | null;
  farcasterPowerUser: boolean;
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
          <th>Profiles</th>
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
              <td>
                <Stack direction="row" spacing={1}>
                  {val.passportId && (
                    <TalentProtocolLink passportId={val.passportId} />
                  )}
                  {val.farcasterId && val.name && (
                    <FarcasterLink username={val.name} />
                  )}
                </Stack>
              </td>
              <td>
                <Link
                  component={NextLink}
                  href={`/nominate/${val.walletAddress}`}
                  disabled={!val.walletAddress}
                  scroll={false}
                >
                  {val.farcasterPowerUser && (
                    <Tooltip
                      variant="outlined"
                      title={
                        <>
                          We&apos;re hiding participants without a Power Badge
                          or builder score above 50 from public leaderboards.
                          <br />
                          This doesn&apos;t affect Daily Budget or Build Points.
                        </>
                      }
                    >
                      <FarcasterPowerBadge sx={{ marginRight: 1 }} />
                    </Tooltip>
                  )}
                  {abbreviateWalletAddress(val.name)}
                </Link>
              </td>

              <td>{formatLargeNumber(val.bossScore)}</td>
              <td>{val.nominationsReceived}</td>
              <td>{Math.round(val.builderScore)}</td>
            </tr>
          ))}
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <tr key={i}>
              <td colSpan={6}>
                <Skeleton variant="text" />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </Sheet>
);
