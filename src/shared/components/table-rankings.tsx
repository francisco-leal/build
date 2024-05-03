import { Sheet, SheetProps, Skeleton, Table } from "@mui/joy";
import { LeaderboardUser } from "@/shared/interfaces";

export type TableRankingsProps = {
  values?: LeaderboardUser[];
  loading?: boolean;
} & SheetProps;

export const TableRankings = ({
  values = [],
  loading,
  variant = "outlined",
  ...props
}: TableRankingsProps) => (
  <Sheet {...props} variant={variant} sx={props.sx}>
    <Table
      sx={{
        backgroundColor: "common.white",
        tr: { textAlign: "left" },
        "& tr.highlight": { color: "primary.500" },
        "--TableCell-borderColor": "var(--joy-palette-neutral-200)",
      }}
    >
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Builder Score</th>
          <th>BOSS Points</th>
          <th style={{ width: 164 }}>Nominations</th>
        </tr>
      </thead>
      <tbody>
        {!loading &&
          values.map((item) => (
            <tr key={item.id} className={item.highlight ? "highlight" : ""}>
              <td>{item.rank}</td>
              <td>
                {item.username ||
                  `${item.wallet_address!.substring(0, 6)}..${item.wallet_address!.substring(item.wallet_address!.length - 4, item.wallet_address!.length)}`}
              </td>
              <td>{item.builder_score}</td>
              <td>{item.boss_points}</td>
              <td>{item.nominations}</td>
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
