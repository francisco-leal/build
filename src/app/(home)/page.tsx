'use client';
import { NavBar } from '@/shared/components/nav-bar';
import { Footer } from '@/shared/components/footer';
import { Stack } from '@mui/joy';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';
import { Section4 } from './section-4';

export default function Home() {
    return (
        <main>
            <NavBar />

            <Stack>
                <Section1 />
                <Section2 />
                <Section3 />
                <Section4 />
            </Stack>

            <Footer />
        </main>
    );
}
