'use client';
import { NavBar } from '@/shared/components/nav-bar';
import { Footer } from '@/shared/components/footer';
import { Typography, Button, Box, Link, Table } from '@mui/joy';
import { Typography, Button, Box, Link, Table, Stack } from '@mui/joy';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';
import { Section4 } from './section-4';

export default function Home() {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };

    return (
        <>
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
