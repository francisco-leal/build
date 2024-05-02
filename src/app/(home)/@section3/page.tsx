import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { LeaderboardUser } from "@/shared/interfaces";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { TableRankings } from "@/shared/components/table-rankings";
import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";

import { makeMap } from "@/shared/utils/make-map";

export const revalidate = 3600;

export default async function Section3() {
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

  const { data: userStats, error: statsError } = await supabase
    .from("app_user_stats")
    .select("user_id, boss_score, nominations, builder_score")
    .in("user_id", userIds)
    .throwOnError();

  const userStatsMap = makeMap(userStats ?? [], (u) => u.user_id.toString());
  const userDataMap = makeMap(usersData ?? [], (u) => u.id.toString());

  const prettyData = leaderboard.map((entry): LeaderboardUser => {
    const sId = entry.user_id?.toString() ?? "";
    const userData = userDataMap[sId];
    const stats = userStatsMap[sId];

    return {
      id: entry.user_id ?? 0,
      name: userData.username ?? "",
      wallet: userData.wallet_address,
      boss_score: stats?.boss_score,
      builder_score: stats?.builder_score,
      nominations: stats?.nominations,
      rank: entry.rank ?? 0,
      highlight: entry.user_id === user?.userId,
    };
  });

  const now = DateTime.utc();
  const format = "LLL dd, hh:mm a 'UTC'";
  const lastUpdate = now.toFormat(format);
  const nextUpdate = now.plus({ seconds: revalidate }).toFormat(format);

  return (
    <HeroSectionWithOverflow>
      <Typography level="h2" className="no-overflow" textColor={"common.white"}>
        Leaderboard
      </Typography>

      <Stack className="overflow">
        <TableRankings values={prettyData} />
      </Stack>

      <Typography
        className="no-overflow"
        level="body-sm"
        sx={{ color: "common.white" }}
      >
        Last update on {lastUpdate}. Next update on {nextUpdate}
      </Typography>
    </HeroSectionWithOverflow>
  );
}
