import { Typography, Button, Box, Link, Table } from '@mui/joy';
import { LogoLong } from '../shared/icons';

export default function Memo() {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };
    return (
        <main>
            {/* NAVBAR */}
            <Box sx={{ padding: '8px 64px', borderBottom: '1px solid var(--neutral-050, #FBFCFE)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LogoLong size={128} />

                    <Box sx={{ display: 'flex', gap: '24px' }}>
                        <Link sx={{ color: colors.white }}>Memo</Link>
                        <Link sx={{ color: colors.white }}>Bossenomics</Link>
                        <Link sx={{ color: colors.white }}>Airdrop</Link>
                    </Box>

                    <Button
                        variant="solid"
                        size="md"
                        sx={{
                            color: colors.blue,
                            backgroundColor: colors.white,
                            borderRadius: '0%'
                        }}
                    >
                        Connect Wallet
                    </Button>
                </Box>
            </Box>

            {/* SECTION 1 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '80px 0px 80px 0px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '1224px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '600px',
                            gap: '16px'
                        }}
                    >
                        <Typography sx={{ color: colors.white, fontSize: '56px', textAlign: "center" }}>
                            The Builder <br /> Memecoin on Base
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </main>
    );
}
