import { Sheet, SheetProps, Table } from '@mui/joy';

export type RankingsTableProps = {
    values: Array<{
        id: number;
        name: string;
        score: number;
        points: number;
        nominations: number;
        highlight?: boolean;
    }>;
} & SheetProps;

export const RankingsTable = ({ values, variant = 'outlined', ...props }: RankingsTableProps) => (
    <Sheet {...props} variant={variant} sx={props.sx}>
        <Table
            sx={{
                backgroundColor: 'common.white',
                '& tr.highlight': { color: 'primary.500' }
            }}
        >
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
                {values.map(item => (
                    <tr key={item.id} className={item.highlight ? 'highlight' : ''}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.score}</td>
                        <td>{item.points}</td>
                        <td>{item.nominations}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Sheet>
);
