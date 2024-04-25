/* eslint-disable react/no-unescaped-entities */
'use client';
import { Card, Typography } from '@mui/joy';
// import { useTheme } from '@mui/joy/styles';

const content = [
    'Dear builder,',
    'If you could go ahead and read this letter, that’d be great.',
    'I hope this memo finds you... doing whatever it is you do. Look, I\'ll cut to the chase – you\'re fired. Yeah, sorry about that.',
    'I mean, don\'t get me wrong, your whole permissionless thing is fascinating and all.',
    'I know you’re all about your autonomy, decentralization and whatnot, but that\'s just not how we do things around here, okay? We like our hierarchies and red tape, thank you very much.',
    'And all this talk about meritocracy, impactful work and equal opportunity? Yeah, that\'s gonna be a no from us. We prefer to keep things nice and cozy for the folks at the top.',
    'So, yeah, consider this your official notice. Mmmkay?',
    'Your services are no longer required, effective immediately. You may think you\'re all hot stuff with your web3 dreams, but let\'s face it – there\'s no room for rebels and troublemakers in the corporate world.',
    'Best regards,'
];

export default function Memo() {
    // const theme = useTheme();
    return (
        <main style={{ backgroundColor: 'blue', margin: 0, height: '100%', width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Card variant='plain' style={{
                backgroundColor: 'white',
                padding: '120px 208px',
                maxWidth: '300px',
                margin: '18px 0px',
                // [theme.breakpoints.up('xs')]: {
                //     maxWidth: '300px',
                //     margin: '18px 0px',
                //   },
                //   [theme.breakpoints.up('sm')]: {
                //     maxWidth: '650px',
                //     margin: '80px 0px',
                //   },
                borderRadius: 0,
                borderWidth: '4px',
                borderColor: 'black',
                borderStyle: 'solid',
                boxShadow: '10px 10px 0px 0px black'
            }}>
                <Typography level="h1">Dear builder, you’re fired.</Typography>
                {content.map((line, index) => (
                    <Typography key={index} level="body-md" style={{ padding: '20px 0px' }}>{line}</Typography>
                ))}
            </Card>
        </main>
    );
}
