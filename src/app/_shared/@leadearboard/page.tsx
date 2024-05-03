import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { makeMap } from "@/shared/utils/make-map";
import {
  LeadearboardTableComponent,
  LeadearboardTableValue,
} from "./component";

export default async function BossPoints() {
  const user = await getSession();

  const { data: leaderboardData } = await supabase
    .from("app_leaderboard_current")
    .select("*")
    .order("rank", { ascending: true })
    .limit(10)
    .throwOnError();

  const { data: currentUserData } = user
    ? await supabase
        .from("app_leaderboard_current")
        .select("*")
        .eq("user_id", user.userId)
        .single()
    : { data: null };

  const leaderboard = [
    ...new Set([...(leaderboardData ?? []), currentUserData].filter(Boolean)),
  ];

  const userIds = leaderboard.map((p) => p.user_id);

  const { data: usersData } = await supabase
    .from("app_user")
    .select("id, wallet_address, username")
    .in("id", userIds)
    .throwOnError();

  const { data: userStats } = await supabase
    .from("app_user_stats")
    .select("user_id, boss_score, nominations, builder_score")
    .in("user_id", userIds)
    .throwOnError();

  const userStatsMap = makeMap(userStats ?? [], (u) => u.user_id?.toString() ?? "");
  const userDataMap = makeMap(usersData ?? [], (u) => u.id.toString());

  const prettyData = leaderboard.map((entry): LeadearboardTableValue => {
    const sId = entry.user_id?.toString() ?? "";
    const userData = userDataMap[sId];
    const stats = userStatsMap[sId];

    return {
      id: entry.user_id?.toString() ?? "123",
      name: userData.username ?? "",
      highlight: entry.user_id === user?.userId,
      builderScore: stats?.builder_score ?? 0,
      nominationsReceived: stats?.nominations ?? 0,
      rank: entry.rank?.toString() ?? "0",
    };
  });

  return <LeadearboardTableComponent values={prettyData} />;
}
