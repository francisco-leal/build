import { Header } from '@/shared/components/header';
import { Footer } from '@/shared/components/footer';
import { Box, Stack } from '@mui/joy';
import { TabsController } from './tabs-controller';

export default function Airdrop() {
    return (
        <>
            <Header />

            <Stack>
                <TabsController />
            </Stack>

            <Footer />
        </>
    );
}
