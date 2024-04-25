'use client';
import { Typography, Button } from '@mui/joy';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function Home() {
    const { open } = useWeb3Modal();

    return (
        <main>
            <Typography level="h1">Hello world</Typography>
            <Button variant="solid" onClick={() => open()}>
                Open
            </Button>
        </main>
    );
}
