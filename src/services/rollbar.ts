import Rollbar from "rollbar";

export function rollbarError(message: string, error?: Error | undefined) {
  if (!process.env.ROLLBAR_SERVER_TOKEN) return;

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  });

  console.error(message, error);
  rollbar.error(message, error, (rollbarError) => {
    if (rollbarError) {
      console.error("Rollbar error reporting failed:");
      console.error(rollbarError);
      return;
    }
    console.log("Reported error to Rollbar");
  });
}

export function rollbarInfo(message: string) {
  if (!process.env.ROLLBAR_SERVER_TOKEN) return;

  const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_TOKEN,
  });

  console.log(message);
  rollbar.info(message, (rollbarError) => {
    if (rollbarError) {
      console.error("Rollbar info reporting failed:");
      console.error(rollbarError);
      return;
    }
    console.log("Reported info to Rollbar");
  });
}
