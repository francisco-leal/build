import Rollbar from "rollbar";

const accessToken = process.env.ROLLBAR_SERVER_TOKEN;

export function rollbarError(message: string, error?: Error | undefined) {
  console.error(message, error);
  if (!accessToken) return;

  const rollbar = new Rollbar({ accessToken });

  rollbar.error(message, error, (rollbarError) => {
    if (!rollbarError) return;
    console.error("Rollbar error reporting failed:", rollbarError);
  });
}

export function rollbarInfo(message: string) {
  console.info(message);
  if (!accessToken) return;

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  });

  rollbar.info(message, (rollbarError) => {
    if (!rollbarError) return;
    console.error("Rollbar info reporting failed:", rollbarError);
  });
}

export function rollbarWarn(message: string, error?: Error | undefined) {
  console.warn(message, error);
  if (!accessToken) return;

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  });

  rollbar.warn(message, error, (rollbarError) => {
    if (!rollbarError) return;
    console.error("Rollbar warn reporting failed:", rollbarError);
  });
}
