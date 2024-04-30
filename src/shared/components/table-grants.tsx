import { Sheet, SheetProps, Table } from '@mui/joy';

export type Investor = {
    id: string;
    description: string;
    status: string;
    supplyPercentage: number;
};

export type TableGrantsProps = {
    values: Array<Investor>;
} & SheetProps;

export const TableGrants = ({ values, variant = 'outlined', ...props }: TableGrantsProps) => (
    <Sheet {...props} variant={variant} sx={props.sx}>
        <Table
            sx={{
                backgroundColor: 'common.white',
                tr: { textAlign: 'left' }
            }}
        >
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Supply %</th>
                </tr>
            </thead>
            <tbody>
                {values.map(item => (
                    <tr key={item.id}>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td>{item.supplyPercentage.toFixed(2)}%</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Sheet>
);
