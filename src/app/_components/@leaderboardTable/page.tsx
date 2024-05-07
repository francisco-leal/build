import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { LeaderboardTableComponent, LeaderboardTableValue } from "./component";
import { abbreviateWalletAddress } from "@/shared/utils/abbreviate-wallet-address";

export default async function LeaderboardTable() {
  const user = await getSession();

  const { data: leaderboardData } = await supabase
    .from("boss_leaderboard")
    .select("*")
    .order("rank", { ascending: true })
    .limit(10)
    .throwOnError();

  const leaderboard = leaderboardData ?? [];
  const currentUserWallet = user?.wallet;
  const containsUser = leaderboard.some((l) => l.wallet === currentUserWallet);

  if (!containsUser && currentUserWallet) {
    const { data: currentUserData } = await supabase
      .from("boss_leaderboard")
      .select("*")
      .eq("wallet", currentUserWallet)
      .single();
    if (currentUserData) leaderboard.push(currentUserData);
  }

  const values = leaderboard.map((entry): LeaderboardTableValue => {
    return {
      id:
        entry.wallet?.toString() ?? abbreviateWalletAddress(entry.wallet ?? ""),
      name: entry.username ?? "",
      highlight: entry.wallet === user?.wallet,
      builderScore: entry?.passport_builder_score ?? 0,
      bossScore: entry?.boss_score ?? 0,
      nominationsReceived: entry?.boss_nominations_received ?? 0,
      rank: entry.rank?.toString() ?? "0",
    };
  });

  return <LeaderboardTableComponent values={values} />;
}
