import { Header } from '@/shared/components/header';
import { Footer } from '@/shared/components/footer';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';
import { Stack } from '@mui/joy';

export default function Bossenomics() {
    return (
        <>
            <Header />

            <Stack component="main" sx={{ alignItems: 'center' }}>
                <Section1 />
                <Section2 />
                <Section3 />
            </Stack>

            <Footer />
        </>
    );
}
