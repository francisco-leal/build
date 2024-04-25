/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, FrameIntent, Frog, TextInput } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
    assetsPath: '/',
    basePath: '/api'
});

app.frame('/:username?', c => {
    const { inputText, status } = c;
    const username = c.req.param('username') || inputText;

    console.log('username', username, inputText);

    const frameIntents: FrameIntent[] = [];
    if (!username) {
        frameIntents.push(<TextInput placeholder="Enter nominee..." />);
    }
    if (status !== 'response') {
        frameIntents.push(<Button value="nominate">Nominate</Button>);
    }
    if (status === 'response') {
        // TODO: do api request to nominate
        frameIntents.push(<Button.Reset>Reset</Button.Reset>);
    }

    return c.res({
        image: (
            <div
                style={{
                    alignItems: 'center',
                    background: status === 'response' ? 'linear-gradient(to right, #432889, #17101F)' : 'black',
                    backgroundSize: '100% 100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    height: '100%',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <div
                    style={{
                        color: 'white',
                        fontSize: 60,
                        fontStyle: 'normal',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.4,
                        marginTop: 30,
                        padding: '0 120px',
                        whiteSpace: 'pre-wrap'
                    }}
                >
                    {status === 'response'
                        ? 'Thaaannkkk youuuu!!1 🥳'
                        : username
                          ? `Vote for ${username}!`
                          : 'Write a nominee 👇'}
                </div>
            </div>
        ),
        intents: frameIntents
    });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
