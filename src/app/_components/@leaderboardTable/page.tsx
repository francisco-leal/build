import { getLeaderboard } from "@/app/_api/get-leaderboard";
import { getCurrentUser } from "@/app/_api/get-user";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";
import { LeaderboardTableComponent } from "./component";

export default async function LeaderboardTable() {
  const leaderboard = await getLeaderboard();
  const currentUser = await getCurrentUser();

  return (
    <LeaderboardTableComponent
      values={leaderboard.map((entry) => ({
        id: entry.wallet,
        name: entry.username ?? abbreviateWalletAddress(entry.wallet),
        highlight: entry.wallet === currentUser?.wallet,
        builderScore: entry.passport_builder_score,
        bossScore: entry.boss_score,
        nominationsReceived: entry.boss_nominations_received,
        rank: entry.rank?.toString() ?? "---",
      }))}
    />
  );
}
