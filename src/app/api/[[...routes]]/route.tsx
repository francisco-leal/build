/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { handle } from 'frog/next';
import { neynar } from 'frog/hubs';
import { serveStatic } from 'frog/serve-static';

const app = new Frog({
    assetsPath: '/',
    basePath: '/api',
    hub: neynar({ apiKey: 'NEYNAR_FROG_FM' }),
    verify: true
});

app.frame('/nominate/:address', async c => {
    const userAddress = c.req.param('address');
    const { origin } = new URL(c.url);
    const r = await fetch(origin + '/api/profile?wallet_address=' + userAddress);
    const response = await r.json();

    return c.res({
        action: `/confirm/${userAddress}`,
        image: (
            <div
                style={{
                    alignItems: 'center',
                    background: 'black',
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
                <div style={{ color: 'white', display: 'flex', fontSize: 30 }}>Name: {response.username}</div>
                <div style={{ color: 'white', display: 'flex', fontSize: 30 }}>Rank: {response.my_rank}</div>
            </div>
        ),
        intents: [<Button value="nominate">Nominate</Button>]
    });
});

app.frame('/confirm/:address', async c => {
    const { status, frameData, previousButtonValues, verified } = c;
    const userAddress = c.req.param('address');
    const fromAddress = frameData?.address;
    const { origin } = new URL(c.url);

    if (!fromAddress) {
        return c.res({
            image: (
                <div style={{ display: 'flex', background: 'black' }}>
                    <div style={{ display: 'flex', color: 'white' }}>Connect first!</div>
                </div>
            ),
            intents: [<Button.Reset>Reset</Button.Reset>]
        });
    }

    if (status === 'response' && previousButtonValues && previousButtonValues[0] === 'confirm') {
        if (verified) {
            const r = await fetch(origin + '/api/nominate/frame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nominated_user_address: userAddress, from_user_address: fromAddress })
            });
            if (r.status === 200) {
                return c.res({
                    image: (
                        <div style={{ display: 'flex', background: 'black' }}>
                            <div style={{ display: 'flex', color: 'white' }}>Nominated!</div>
                        </div>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
            if (r.status === 401) {
                return c.res({
                    image: (
                        <div style={{ display: 'flex', background: 'black' }}>
                            <div style={{ display: 'flex', color: 'white' }}>Connect first!</div>
                        </div>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
            if (r.status === 400) {
                const response = await r.json();
                return c.res({
                    image: (
                        <div style={{ display: 'flex', background: 'black' }}>
                            <div style={{ display: 'flex', color: 'white' }}>{response.error}</div>
                        </div>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
        }
    }

    const r = await fetch(origin + '/api/profile?wallet_address=' + fromAddress);
    const response = await r.json();

    return c.res({
        image: (
            <div
                style={{
                    alignItems: 'center',
                    background: 'black',
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
                <div style={{ color: 'white', display: 'flex', fontSize: 30 }}>
                    You will give: {response.my_boss_budget * 0.9} points
                </div>
                <div style={{ color: 'white', display: 'flex', fontSize: 30 }}>
                    You will receive: {response.my_boss_budget * 0.1} points
                </div>
            </div>
        ),
        intents: [<Button value="confirm">Confirm</Button>]
    });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
