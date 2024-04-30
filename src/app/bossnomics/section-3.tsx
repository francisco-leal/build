import { Typography, Stack } from '@mui/joy';
import { HeroSectionWithOverflow } from '@/shared/components/hero-section-with-overflow';
import { TableGrants } from '@/shared/components/table-grants';

const investorData = [
    {
        id: '1',
        description: 'CompanyA',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '2',
        description: 'CompanyB',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '3',
        description: 'CompanyC',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '4',
        description: 'CompanyD',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '5',
        description: 'CompanyE',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '6',
        description: 'CompanyF',
        status: 'Vesting',
        supplyPercentage: 2
    },
    {
        id: '7',
        description: 'CompanyG',
        status: 'Vesting',
        supplyPercentage: 2
    }
];

export const Section3 = () => {
    return (
        <HeroSectionWithOverflow>
            <Typography level="h2" className="no-overflow" textColor={'common.white'}>
                Ecosystem
            </Typography>

            <Typography className="no-overflow" level="title-lg" sx={{ color: 'common.white' }}>
                2% of the funds have been distributed.
            </Typography>

            <Stack className="overflow">
                <TableGrants values={investorData} />
            </Stack>
        </HeroSectionWithOverflow>
    );
};
