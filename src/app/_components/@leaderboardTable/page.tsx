import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { LeaderboardTableComponent, LeaderboardTableValue } from "./component";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export default async function LeaderboardTable() {
  const user = await getSession();

  const { data: leaderboardData } = await supabase
    .from("app_leaderboard_current")
    .select("*")
    .order("rank", { ascending: true })
    .limit(10)
    .throwOnError();

  const leaderboard = leaderboardData ?? [];
  const currentUserId = user?.userId;
  const containsUser = leaderboard.some((l) => l.user_id === currentUserId);

  if (!containsUser && currentUserId) {
    const { data: currentUserData } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .eq("user_id", currentUserId)
      .single();
    if (currentUserData) leaderboard.push(currentUserData);
  }

  const values = leaderboard.map((entry): LeaderboardTableValue => {
    return {
      id:
        entry.user_id?.toString() ??
        abbreviateWalletAddress(entry.wallet_address ?? ""),
      name: entry.username ?? "",
      highlight: entry.user_id === user?.userId,
      builderScore: entry?.builder_score ?? 0,
      bossScore: entry?.boss_points ?? 0,
      nominationsReceived: entry?.nominations ?? 0,
      rank: entry.rank?.toString() ?? "0",
    };
  });

  return <LeaderboardTableComponent values={values} />;
}
