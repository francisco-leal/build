'use client';
import { Box, Button, Link, Typography } from '@mui/joy';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export const NavBar = () => {
    const { open } = useWeb3Modal();

    return (
        <Box component="nav" sx={{ py: 2, px: 2, borderBottom: 1, borderColor: 'common.white' }}>
            <Box
                sx={{
                    display: 'flex',
                    maxWidth: 'lg',
                    width: '100%',
                    mx: 'auto',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <Typography level="h2" sx={{ color: 'white' }}>
                    BOSS
                </Typography>

                <Box sx={{ gap: '24px', display: { xs: 'none', md: 'flex' } }}>
                    <Link sx={{ color: 'common.white' }}>Memo</Link>
                    <Link sx={{ color: 'common.white' }}>Airdrop</Link>
                    <Link sx={{ color: 'common.white' }}>Bossenomics</Link>
                </Box>

                <Button variant="solid" color="neutral" onClick={() => open()}>
                    Connect Wallet
                </Button>
            </Box>
        </Box>
    );
};
