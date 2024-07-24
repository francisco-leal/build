import { getUserStats } from "@/app/_api/data/stats";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

type CheckIntractRequest = {
  address: `0x${string}`;
};

export const POST = restApiHandler(async (request) => {
  const { address } = (await request.json()) as CheckIntractRequest;

  if (!address || address.length !== 42 || !address.startsWith("0x")) {
    return {
      data: {
        result: false,
      },
    };
  }

  const userStats = await getUserStats(address.toLowerCase());

  if (!userStats) {
    return {
      data: {
        result: false,
      },
    };
  }

  return {
    data: {
      result: (userStats.nominations_made ?? 0) >= 1,
    },
  };
});
