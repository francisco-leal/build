import { Typography, Stack } from '@mui/joy';
import { HeroSectionWithOverflow } from '@/shared/components/hero-section-with-overflow';
import { TableGrants } from '@/shared/components/table-grants';

const grantsData = [
    {
        id: '1',
        description: 'Website & Brand Grant',
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
                <TableGrants values={grantsData} />
            </Stack>
        </HeroSectionWithOverflow>
    );
};
