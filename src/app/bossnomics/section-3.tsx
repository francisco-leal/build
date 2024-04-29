import { Typography, Stack } from '@mui/joy';
import { GrantsTable } from '@/shared/components/grants-table';

export const Section3 = () => {
    return (
        <Stack
            component="section"
            sx={{
                py: 10,
                pl: { xs: 2, sm: 8 },
                pr: { xs: 0, md: 8 },
                maxWidth: { xs: 'md', md: 'lg' },
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
                position: 'relative',
                overflowX: 'hidden',
                textAlign: 'center',
                gap: 2
            }}
        >
            <Typography
                sx={{
                    color: 'common.white',
                    fontSize: { xs: 30, md: '40px' },
                    pr: { xs: 2, sm: 0 },
                    fontWeight: 'bold'
                }}
            >
                Ecosystem
            </Typography>

            <Typography sx={{ color: 'common.white', fontSize: '18px', fontWeight: '600' }}>
                2% of the funds have been distributed.
            </Typography>

            <Stack sx={{ width: '100%', overflowX: 'scroll', display: { md: 'none' } }}>
                <GrantsTable
                    sx={{
                        width: { xs: 980 },
                        mr: { xs: 8 },
                        my: 4
                    }}
                />
            </Stack>

            <GrantsTable
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: '100%',
                    my: 4
                }}
            />
        </Stack>
    );
};
