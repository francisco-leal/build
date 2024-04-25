import { Typography, Button, Box, Link, Table } from '@mui/joy';
import { NavBar } from '@/app/shared/components/nav-bar';
import { Footer } from '@/app/shared/components/footer';

export default function Memo() {
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
                        <Typography sx={{ color: colors.white, fontSize: '56px', textAlign: "center", fontWeight: "bold" }}>
                            The Builder <br /> Memecoin on Base
                        </Typography>

                        <Typography sx={{ color: colors.white, fontSize: '18px', textAlign: "center", fontWeight: "bold" }}>
                            $BOSS is an ERC-20 token on Base with a total supply of a 404,404,404,404. It launched on May 2024, with a 7-day crowdfund on party.app, followed by a Community Airdrop to onchain builders.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* SECTION 2 */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '40px 0px 40px 0px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: "40px",
                        width: '1224px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '16px'
                        }}
                    >
                        <Typography sx={{ color: colors.white, fontSize: '40px', textAlign: "center", fontWeight: "bold" }}>
                            Tokenomics
                        </Typography>

                        <Typography sx={{ color: colors.white, fontSize: '18px', textAlign: "center", fontWeight: "600", width: "806px" }}>
                            60% of tokens are intended for the community and ecosystem. The other 40% are related with the initial liquidity pool on Uniswap and liquidity mining rewards.
                        </Typography>

                        <Typography sx={{ color: colors.white, fontSize: '18px', textAlign: "center", }}>
                            0xf4ec...eEc64F
                        </Typography>
                    </Box>

                    <Box sx={{ height: "452px", width: "100%", backgroundColor: colors.white, border: `4px solid ${colors.black}`, boxShadow: `12px 12px 0px 0px ${colors.black}` }}>
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
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        <Typography sx={{ color: colors.white, fontSize: '40px', fontWeight: 'bold' }}>
                            Ecosystem
                        </Typography>

                        <Typography sx={{ color: colors.white, fontSize: '18px', fontWeight: 'bold' }}>
                            20% of the funds have been distributed.
                        </Typography>
                    </Box>

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
                </Box>
            </Box>

            <Footer />
        </main>
    );
}
