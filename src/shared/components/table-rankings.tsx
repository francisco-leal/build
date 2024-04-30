import { Sheet, SheetProps, Table } from '@mui/joy';
import { LeaderboardUser } from '@/shared/interfaces';

export type TableRankingsProps = {
    values: LeaderboardUser[];
} & SheetProps;

export const TableRankings = ({ values, variant = 'outlined', ...props }: TableRankingsProps) => (
    <Sheet {...props} variant={variant} sx={props.sx}>
        <Table
            sx={{
                backgroundColor: 'common.white',
                tr: { textAlign: 'left' },
                '& tr.highlight': { color: 'primary.500' }
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
                {values.map(item => (
                    <tr key={item.id} className={item.highlight ? 'highlight' : ''}>
                        <td>{item.rank}</td>
                        <td>
                            {item.name ||
                                `${item.wallet.substring(0, 6)}..${item.wallet.substring(item.wallet.length - 4, item.wallet.length)}`}
                        </td>
                        <td>{item.builder_score}</td>
                        <td>{item.boss_score}</td>
                        <td>{item.nominations}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Sheet>
);
