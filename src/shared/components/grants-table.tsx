import { Sheet, SheetProps, Table } from '@mui/joy';

export const GrantsTable = ({ variant = 'outlined', ...props }: SheetProps) => (
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
                    <th>Description</th>
                    <th>Status</th>
                    <th>Supply %</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Brand & Website Grant</td>
                    <td>Vesting</td>
                    <td>2%</td>
                </tr>
            </tbody>
        </Table>
    </Sheet>
);
