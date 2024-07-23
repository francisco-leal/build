import { FunctionComponent } from "react";
import { default as NextLink } from "next/link";
import { Box, Link, Sheet, SheetProps, Skeleton, Table, Stack } from "@mui/joy";
import { DiscoveryLeaderboardValue } from "@/app/_api/external/openrank";
import { FarcasterLink } from "@/shared/components/farcaster-link";
import { TalentProtocolLink } from "@/shared/components/talentprotocol-link";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { formatLargeNumber } from "@/shared/utils/format-number";

export type TableDiscoveryProps = {
  values?: DiscoveryLeaderboardValue[];
  loading?: boolean;
} & SheetProps;

export const TableDiscovery: FunctionComponent<TableDiscoveryProps> = ({
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
          <th>Builder Score</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((val, i) => (
            <tr key={val.id} className={i % 2 ? "odd" : ""}>
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
                  {abbreviateWalletAddress(val.name)}
                </Link>
              </td>
              <td>{Math.round(val.builderScore)}</td>
            </tr>
          ))}
        {loading &&
          [1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td colSpan={2}>
                <Skeleton variant="text" />
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </Sheet>
);
