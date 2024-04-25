'use client';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Typography, Button, Box, Table, Link } from '@mui/joy';
import { NavBar } from '@/app/shared/components/nav-bar';
import { Footer } from '@/app/shared/components/footer';

export default function Home() {
    const { open } = useWeb3Modal();

    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };

    const mockData = [
        { id: 1, name: 'Tiago', score: 50, points: 2000, nominations: 10 },
        { id: 2, name: 'Leal', score: 150, points: 4000, nominations: 70 },
        { id: 3, name: 'Filipe', score: 200, points: 10000, nominations: 50 },
        { id: 4, name: 'Pedro', score: 100, points: 8000, nominations: 30 }
    ];

    return (
        <main>
            <NavBar />

            {/* SECTION 1 */}
            <Box
                sx={{
                    padding: '144px 0 80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: 'url(/images/homepage.png)',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '1224px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '600px',
                            gap: '40px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '16px'
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        color: colors.white,
                                        fontSize: '64px',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        lineHeight: '1'
                                    }}
                                >
                                    Dear builder,
                                    <br /> you're fired.
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography
                                    sx={{
                                        color: colors.white,
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}
                                >
                                    There's no room for builders in the corporate world. Read the memo and help us keep
                                    the status quo: nominate the builders you know.
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <Button
                                variant="outlined"
                                size="md"
                                sx={{
                                    color: colors.white,
                                    borderRadius: '0%'
                                }}
                            >
                                <Link href="/memo" underline='none' sx={{color: colors.white}}>
                                    Read BOSS Memo
                                </Link>
                            </Button>

                            <Button
                                variant="solid"
                                size="md"
                                sx={{
                                    color: colors.blue,
                                    backgroundColor: colors.white,
                                    borderRadius: '0%'
                                }}
                            >
                                Mint Builders Manifesto
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 2 */}
            <Box
                sx={{
                    padding: '80px 0 80px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        width: '1224px',
                        height: '340px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '40px'
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: colors.white,
                            height: '100%',
                            width: '50%',
                            boxShadow: `12px 12px 0px 0px ${colors.black}`,
                            border: `4px solid ${colors.black}`
                        }}
                    >
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>What is BOSS?</Typography>
                                    <Typography
                                        sx={{
                                            color: colors.grey,
                                            fontSize: '18px',
                                            textAlign: 'center',
                                            lineHeight: '1'
                                        }}
                                    >
                                        BOSS is a meme, a token of appreciation and a social game designed to reward
                                        builders via onchain nominations.
                                    </Typography>
                                </Box>

                                <Button
                                    variant="solid"
                                    size="md"
                                    sx={{
                                        color: colors.white,
                                        backgroundColor: colors.blue,
                                        borderRadius: '0%'
                                    }}
                                >
                                    Get $BOSS
                                </Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: colors.white,
                            height: '100%',
                            width: '50%',
                            boxShadow: `12px 12px 0px 0px ${colors.black}`,
                            border: `4px solid ${colors.black}`
                        }}
                    >
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                                    <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                                        How BOSS works?
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: colors.grey,
                                            fontSize: '18px',
                                            textAlign: 'center',
                                            lineHeight: '1'
                                        }}
                                    >
                                        SocialFi users will have a daily budget of BOSS points, and can nominate 1
                                        builder per day to receive it. Read more in the FAQ.
                                    </Typography>
                                </Box>

                                <Button
                                    onClick={() => open()}
                                    variant="solid"
                                    size="md"
                                    sx={{
                                        color: colors.white,
                                        backgroundColor: colors.blue,
                                        borderRadius: '0%'
                                    }}
                                >
                                    Connect Wallet
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 3 */}
            <Box
                sx={{
                    padding: '80px 0 80px',
                    display: 'flex',
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
                        gap: '40px'
                    }}
                >
                    <Typography sx={{ color: colors.white, fontSize: '40px', fontWeight: 'bold' }}>
                        Layoff Leaderboard
                    </Typography>

                    <Box sx={{ boxShadow: `12px 12px 0px 0px ${colors.black}`, border: `4px solid ${colors.black}` }}>
                        <Table aria-label="basic table" sx={{ backgroundColor: colors.white }}>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Builder Score</th>
                                    <th>BOSS Points</th>
                                    <th>Nominations Received</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.score}</td>
                                        <td>{item.points}</td>
                                        <td>{item.nominations}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Box>

                    <Typography sx={{ color: colors.white, fontSize: '14px' }}>
                        Last update on May 21st, 4pm UTC. Next update on May 30, 4pm UTC
                    </Typography>
                </Box>
            </Box>

            {/* SECTION 4 */}
            <Box
                sx={{
                    padding: '80px 0 80px',
                    display: 'flex',
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

            <Footer />
        </main>
    );
}
