import { Box, Sheet, Table, Typography } from '@mui/joy';

const mockData = [
    { id: 1, name: 'Tiago', score: 50, points: 2000, nominations: 10 },
    { id: 2, name: 'Leal', score: 150, points: 4000, nominations: 70 },
    { id: 3, name: 'Filipe', score: 200, points: 10000, nominations: 50 },
    { id: 4, name: 'Pedro', score: 100, points: 8000, nominations: 30 }
];

export const Section3 = () => (
    <Box
        sx={{
            // Temporary, hide section in mobile
            display: 'flex',
            padding: '80px 0 80px',

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
            <Typography sx={{ color: 'common.white', fontSize: '40px', fontWeight: 'bold' }}>
                Layoff Leaderboard
            </Typography>

            <Sheet variant="outlined" sx={{ width: '100%' }}>
                <Table aria-label="basic table" sx={{ backgroundColor: 'common.white' }}>
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
            </Sheet>

            <Typography sx={{ color: 'common.white', fontSize: '14px' }}>
                Last update on May 21st, 4pm UTC. Next update on May 30, 4pm UTC
            </Typography>
        </Box>
    </Box>
);
