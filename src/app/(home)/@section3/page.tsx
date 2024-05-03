import { Stack, Typography } from "@mui/joy";
import { DateTime } from "luxon";
import { LeaderboardUser } from "@/shared/interfaces";
import { HeroSectionWithOverflow } from "@/shared/components/hero-section-with-overflow";
import { TableRankings } from "@/shared/components/table-rankings";
import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { Tables } from "@/db/database.types";

export const revalidate = 3600;

export default async function Section3() {
  const user = await getSession();

  let app_leaderboard: Tables<"app_leaderboard_current">[] | null = [];

  if (!!user) {
    let { data, error } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .neq("user_id", user.userId)
      .order("rank", { ascending: true })
      .limit(10);

    if (error || !data) {
      throw new Error("Error fetching leaderboard data");
    }
    const { data: currentUserRank } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .eq("user_id", user.userId)
      .single();

    if (
      !!currentUserRank &&
      !!data &&
      !data.find(
        (leaderboardPosition) => leaderboardPosition.user_id === user.userId
      )
    ) {
      data = [currentUserRank, ...data];
    }

    app_leaderboard = data;
  } else {
    const { data, error } = await supabase
      .from("app_leaderboard_current")
      .select("*")
      .order("rank", { ascending: true })
      .limit(10);

    if (error) {
      throw new Error("Error fetching leaderboard data");
    }

    app_leaderboard = data;
  }

  if (!app_leaderboard) {
    throw new Error("No leaderboard data found");
  }

  const prettyData = app_leaderboard.map(
    (entry): LeaderboardUser => ({
      ...entry,
      id: entry.user_id ?? 0,
      highlight: entry.user_id === user?.userId,
    })
  );

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
