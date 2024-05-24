import { rollbarWarn } from "@/services/rollbar";

export const notifyBuildBot = async (
  nominatorWallet: string,
  nominatedWallet: string,
  points: number,
) => {
  if (points < 2000) return;

  try {
    const buildbotResponse = await fetch(
      `${process.env.BUILDBOT_API_URL}/webhooks/mentions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-key": `${process.env.BUILDBOT_WEBHOOK_KEY}`,
        },
        body: JSON.stringify({
          points,
          nominatorWallet,
          nominatedWallet,
        }),
      },
    );

    if (!buildbotResponse.ok) {
      rollbarWarn("an error occurred while calling the buildbot API");
    }
  } catch (e) {
    rollbarWarn(`an error occurred while calling the buildbot API: ${e}`);
  }
};
