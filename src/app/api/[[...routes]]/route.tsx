/* eslint-disable react/jsx-key */
/** @jsxImportSource frog/jsx */

import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { neynar } from "frog/middlewares";
import { serveStatic } from "frog/serve-static";
import { createSystem } from "frog/ui";
import { getAddress } from "viem";

const { Box, Heading, Text, VStack, vars } = createSystem();

type CVarInteractor = {
  custodyAddress?: string;
};

const app = new Frog({
  assetsPath: "/",
  basePath: "/api",
  ui: { vars },
});

app.use(
  neynar({
    apiKey: process.env.NEXT_PUBLIC_NEYNAR_API!,
    features: ["interactor"],
  }),
);

app.frame("/nominate/:address", async (c) => {
  const userAddress = c.req.param("address");
  const { origin } = new URL(c.url);
  const r = await fetch(origin + "/api/profile?wallet_address=" + userAddress);
  const { username, rank } = await r.json();

  return c.res({
    action: `/confirm/${userAddress}`,
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Heading>Nominate {username}</Heading>
          <Text color="text200" size="20">
            Current rank is {rank}
          </Text>
        </VStack>
      </Box>
    ),
    intents: [<Button value="nominate">Nominate</Button>],
  });
});

app.frame("/confirm/:address", async (c) => {
  const {
    status,
    previousButtonValues,
    verified,
    req,
    url,
    res,
    var: cVar,
  } = c;
  const userAddress = req.param("address");
  const fromAddress = (cVar.interactor as CVarInteractor).custodyAddress;
  const { origin } = new URL(url);

  if (!fromAddress) {
    return res({
      image: (
        <Box
          grow
          alignVertical="center"
          backgroundColor="background"
          padding="32"
        >
          <VStack gap="4">
            <Text color="text200" size="20">
              Connect first!
            </Text>
          </VStack>
        </Box>
      ),
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }

    if (status === 'response' && previousButtonValues && previousButtonValues[0] === 'confirm') {
        if (verified) {
            const r = await fetch(origin + '/api/nominate/frame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // TODO: add api key
                },
                body: JSON.stringify({
                    nominated_user_address: userAddress,
                    from_user_address: fromAddress
                })
            });
            if (r.status === 200) {
                return res({
                    image: (
                        <Box grow alignVertical="center" backgroundColor="background" padding="32">
                            <VStack gap="4">
                                <Heading>Nominated !!1 🥳</Heading>
                            </VStack>
                        </Box>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
            if (r.status === 401) {
                return res({
                    image: (
                        <Box grow alignVertical="center" backgroundColor="background" padding="32">
                            <VStack gap="4">
                                <Text color="text200" size="20">
                                    Connect first!
                                </Text>
                            </VStack>
                        </Box>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
            if (r.status === 400) {
                const { error } = await r.json();
                return res({
                    image: (
                        <Box grow alignVertical="center" backgroundColor="background" padding="32">
                            <VStack gap="4">
                                <Text color="text200" size="20">
                                    {error}
                                </Text>
                            </VStack>
                        </Box>
                    ),
                    intents: [<Button.Reset>Reset</Button.Reset>]
                });
            }
        }
    }

  const r = await fetch(
    origin + "/api/profile?wallet_address=" + getAddress(fromAddress),
  );

  if (r.status === 404) {
    return res({
      image: (
        <Box
          grow
          alignVertical="center"
          backgroundColor="background"
          padding="32"
        >
          <VStack gap="4">
            <Text color="text200" size="20">
              Connect to BOSS to get your initial budget points!
            </Text>
          </VStack>
        </Box>
      ),
      intents: [<Button.Reset>Reset</Button.Reset>],
    });
  }

  const { boss_budget } = await r.json();

  return res({
    image: (
      <Box
        grow
        alignVertical="center"
        backgroundColor="background"
        padding="32"
      >
        <VStack gap="4">
          <Text color="text200" size="20">
            You will give: {Math.round(boss_budget * 0.9 * 100) / 100} points
          </Text>
          <Text color="text200" size="20">
            You will receive: {Math.round(boss_budget * 0.1 * 100) / 100} points
          </Text>
        </VStack>
      </Box>
    ),
    intents: [<Button value="confirm">Confirm</Button>],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
