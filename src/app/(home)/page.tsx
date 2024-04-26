'use client';
import { NavBar } from '@/shared/components/nav-bar';
import { Typography, Button, Box, Link, Table } from '@mui/joy';
import { Section1 } from './section-1';
import { Section2 } from './section-2';
import { Section3 } from './section-3';

export default function Home() {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };

    return (
        <main>
            <NavBar />
            <Section1 />
            <Section2 />
            <Section3 />

            {/* SECTION 4 */}
            <Box
                sx={{
                    // Temporary, hide section in mobile
                    display: 'none',
                    padding: '80px 0 80px',

                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        // Temporary, hide section in mobile
                        display: { xs: 'none', md: 'flex' },
                        width: '1224px',

                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '40px'
                    }}
                >
                    <Typography sx={{ color: colors.white, fontSize: '40px', fontWeight: 'bold' }}>
                        Become a BOSS
                    </Typography>

                    <Box sx={{ display: 'flex', gap: '24px' }}>
                        <Box
                            sx={{
                                height: '100%',
                                width: '50%'
                            }}
                        >
                            <Box
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '40px',
                                        gap: '40px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Typography sx={{ color: colors.white, fontSize: '24px', fontWeight: 'bold' }}>
                                            Step 1
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: colors.white,
                                                fontSize: '18px',
                                                textAlign: 'center',
                                                lineHeight: '1'
                                            }}
                                        >
                                            Claim your Talent Passport and increase your Builder Score before the first
                                            snapshot, on May 7th at 17:59 UTC. The bigger your Builder Score, the higher
                                            your daily budget.
                                        </Typography>
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
                                        Claim Talent Passport
                                    </Button>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                height: '100%',
                                width: '50%'
                            }}
                        >
                            <Box
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            >
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '40px',
                                        gap: '40px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}
                                    >
                                        <Typography sx={{ color: colors.white, fontSize: '24px', fontWeight: 'bold' }}>
                                            Step 2
                                        </Typography>

                                        <Typography
                                            sx={{
                                                color: colors.white,
                                                fontSize: '18px',
                                                textAlign: 'center',
                                                lineHeight: '1'
                                            }}
                                        >
                                            Join us on party.app until May 7th, to help us raise LP funds and launch the
                                            $BOSS token together on May 8th! Read more in the Bossenomics.
                                        </Typography>
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
                                        Join Party
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* FOOTER */}
            <Box
                sx={{
                    // Temporary, hide section in mobile
                    display: 'none',
                    padding: '48px 0 32px 0',

                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '1224px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '24px'
                    }}
                >
                    <Typography sx={{ color: colors.white, fontSize: '51px' }}>BOSS</Typography>

                    <Box sx={{ display: 'flex', gap: '24px' }}>
                        <Link sx={{ color: colors.white }}>Buy</Link>
                        <Link sx={{ color: colors.white }}>Farcaster</Link>
                        <Link sx={{ color: colors.white }}>Telegram</Link>
                        <Link sx={{ color: colors.white }}>Party.app</Link>
                        <Link sx={{ color: colors.white }}>FAQ</Link>
                        <Link sx={{ color: colors.white }}>Meme templates</Link>
                    </Box>

                    <Typography sx={{ color: colors.white }}>
                        BOSS is an experimental community project, not directly owned by{' '}
                        <Link sx={{ color: colors.white, textDecoration: 'underline' }}>Talent Protocol</Link>. Not
                        Financial Advice. DYOR.
                    </Typography>
                </Box>
            </Box>
        </main>
    );
}
