import { unstable_cache } from "next/cache";
import { CacheKey } from "../helpers/cache-keys";
import DesignTop50Data from "./openrank-data/design-top-50-rich-data.json";
import { getTalentProtocolUser } from "./talent-protocol";

export type OpenGraphAndTalentProtocolResult = {
  fid: number;
  fname: string;
  username: string;
  rank: number;
  addresses: `0x${string}`[];
  passportId: number | null;
  builderScore: number | null;
};

export type DiscoveryLeaderboardValue = {
  id: string;
  name: string;
  rank: number;
  farcasterId: number | null;
  passportId: number | null;
  builderScore: number;
  walletAddress: string | null;
};

const getLeaderboardTop50 = unstable_cache(async () => {
  const result = await fetch(
    "https://graph.cast.k3l.io/channels/rankings/design?lite=false",
  );
  const data = (await result.json()) as {
    result: OpenGraphAndTalentProtocolResult[];
  };

  let leaderboardData = [];
  for (const entry of data?.result ?? []) {
    if (entry.addresses.length === 0) {
      leaderboardData.push(entry);
      continue;
    }

    let addressToUser = entry.addresses[0];
    let tp_profile = await getTalentProtocolUser(addressToUser);
    if (!tp_profile) {
      addressToUser = entry.addresses[1];
      tp_profile = await getTalentProtocolUser(addressToUser);
      if (!tp_profile) {
        if (entry.addresses.length === 2) {
          leaderboardData.push(entry);
          continue;
        }
        addressToUser = entry.addresses[2];
        tp_profile = await getTalentProtocolUser(addressToUser);
        if (!tp_profile) {
          leaderboardData.push(entry);
          continue;
        }
      }
    }
    leaderboardData.push({
      ...entry,
      passportId: tp_profile.passport_id,
      builderScore: tp_profile.score,
    });
  }

  return leaderboardData ?? [];
}, ["discover_leaderboard" satisfies CacheKey]);

export const getDiscoveryLeaderboard = async (): Promise<
  DiscoveryLeaderboardValue[]
> => {
  return DesignTop50Data.map((entry, index) => ({
    id: entry.fid.toString() ?? "---",
    name: entry.username ?? "---",
    rank: entry.rank ?? "---",
    farcasterId: entry.fid,
    passportId: entry.passportId ?? null,
    builderScore: entry.builderScore ?? 0,
    walletAddress: entry.addresses.length > 0 ? entry.addresses[0] : null,
  }));
};
