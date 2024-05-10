import { supabase } from "@/db";

export async function computeLeaderboard() {
  const { error: error_update_leaderboard } =
    await supabase.rpc("update_leaderboard");
  if (error_update_leaderboard) {
    throw error_update_leaderboard;
  }
}

export async function resetMissedStreaks() {
  const { error: error_reset_nomination_streak } = await supabase.rpc(
    "reset_nomination_streak",
  );
  if (error_reset_nomination_streak) {
    throw error_reset_nomination_streak;
  }
}

export async function recalculateBossBudget() {
  const { error: error_calculate_boss_budget } = await supabase.rpc(
    "calculate_boss_budget",
  );
  if (error_calculate_boss_budget) {
    throw error_calculate_boss_budget;
  }
}
