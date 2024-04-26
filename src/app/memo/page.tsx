/* eslint-disable react/no-unescaped-entities */
'use client';
import { Sheet, Stack, Typography } from '@mui/joy';
import { NavBar } from '@/shared/components/nav-bar';
import { Footer } from '@/shared/components/footer';

const content = [
    'Dear builder,',
    "If you could go ahead and read this letter, that'd be great.",
    "I hope this memo finds you... doing whatever it is you do. Look, I'll cut to the chase - you're fired. Yeah, sorry about that.",
    "I mean, don't get me wrong, your whole permissionless thing is fascinating and all.",
    "I know you're all about your autonomy, decentralization and whatnot, but that's just not how we do things around here, okay? We like our hierarchies and red tape, thank you very much.",
    "And all this talk about meritocracy, impactful work and equal opportunity? Yeah, that's gonna be a no from us. We prefer to keep things nice and cozy for the folks at the top.",
    'So, yeah, consider this your official notice. Mmmkay?',
    "Your services are no longer required, effective immediately. You may think you're all hot stuff with your web3 dreams, but let's face it - there's no room for rebels and troublemakers in the corporate world.",
    'Best regards,'
];

export default function Memo() {
    return (
        <main>
            <NavBar />

            <Stack sx={{ alignItems: 'center' }}>
                <Stack
                    component="section"
                    sx={{
                        maxWidth: { md: 'lg' },
                        py: 10,
                        px: { xs: 2, md: 0 }
                    }}
                >
                    <Sheet
                        variant="outlined"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            py: { xs: 5, md: 15 },
                            px: { xs: 2, md: 21 },
                            gap: 5
                        }}
                    >
                        <Typography sx={{ fontSize: { xs: '32px', md: '56px' }, fontWeight: 'bold' }}>
                            Dear builder, you're fired.
                        </Typography>

                        <Stack sx={{ gap: 4 }}>
                            {content.map((line, index) => (
                                <Typography key={index} sx={{ fontSize: '18px', fontWeight: '600' }}>
                                    {line}
                                </Typography>
                            ))}
                        </Stack>
                    </Sheet>
                </Stack>
            </Stack>

            <Footer />
        </main>
    );
}
