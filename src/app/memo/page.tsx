/* eslint-disable react/no-unescaped-entities */
'use client';
import { Box, Typography } from '@mui/joy';
import { NavBar } from '../shared/components/nav-bar';
import { Footer } from '../shared/components/footer';

const content = [
    'Dear builder,',
    'If you could go ahead and read this letter, that’d be great.',
    "I hope this memo finds you... doing whatever it is you do. Look, I'll cut to the chase – you're fired. Yeah, sorry about that.",
    "I mean, don't get me wrong, your whole permissionless thing is fascinating and all.",
    "I know you’re all about your autonomy, decentralization and whatnot, but that's just not how we do things around here, okay? We like our hierarchies and red tape, thank you very much.",
    "And all this talk about meritocracy, impactful work and equal opportunity? Yeah, that's gonna be a no from us. We prefer to keep things nice and cozy for the folks at the top.",
    'So, yeah, consider this your official notice. Mmmkay?',
    "Your services are no longer required, effective immediately. You may think you're all hot stuff with your web3 dreams, but let's face it – there's no room for rebels and troublemakers in the corporate world.",
    'Best regards,'
];

export default function Memo() {
    const colors = { blue: '#0142F5', white: '#FBFCFE', lightBlue: '#CDD7E1', black: '#0B0D0E', grey: '#636B74' };
    return (
        <main>
            <NavBar />

            <Box sx={{
                padding: '80px 0 80px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box
                    sx={{
                        backgroundColor: colors.white,
                        width: "1224px",
                        boxShadow: `12px 12px 0px 0px ${colors.black}`,
                        border: `4px solid ${colors.black}`
                        // [theme.breakpoints.up('xs')]: {
                        //     maxWidth: '300px',
                        //     margin: '18px 0px',
                        //   },
                        //   [theme.breakpoints.up('sm')]: {
                        //     maxWidth: '650px',
                        //     margin: '80px 0px',
                        //   },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: "column",
                        gap: "32px",
                        padding: "120px 208px 120px 208px",
                    }}>
                        <Typography sx={{fontSize: "56px", fontWeight: "bold"}}>Dear builder, you're fired.</Typography>

                        <Box sx={{display: 'flex',
                        flexDirection: "column",
                        gap: "32px",}}>
                            {content.map((line, index) => (
                                <Typography key={index} sx={{fontSize: "18px", fontWeight: "600"}}>
                                    {line}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Footer />
        </main>
    );
}
