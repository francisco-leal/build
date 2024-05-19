import { supabase } from "@/db";
import { rollbarError, rollbarInfo } from "./rollbar";

export async function computeLeaderboard() {
  const { error: error_update_leaderboard } =
    await supabase.rpc("update_leaderboard");
  if (error_update_leaderboard) {
    rollbarError(`computeLeaderboard error: ${error_update_leaderboard.message}`);
    throw error_update_leaderboard;
  } else {
    rollbarInfo("computeLeaderboard successful");
  }
}

export async function incrementStreaks() {
  const { error: error_reset_nomination_streak } = await supabase.rpc(
    "increment_nomination_streak",
  );
  if (error_reset_nomination_streak) {
    rollbarError(`incrementStreaks error: ${error_reset_nomination_streak.message}`);
    throw error_reset_nomination_streak;
  } else {
    rollbarInfo("incrementStreaks successful");
  }
}

export async function resetMissedStreaks() {
  const { error: error_reset_nomination_streak } = await supabase.rpc(
    "reset_nomination_streak",
  );
  if (error_reset_nomination_streak) {
    rollbarError(`resetMissedStreaks error: ${error_reset_nomination_streak.message}`);
    throw error_reset_nomination_streak;
  } else {
    rollbarInfo("resetMissedStreaks successful");
  }
}

export async function recalculateBossBudget() {
  const { error: error_calculate_boss_budget } = await supabase.rpc(
    "calculate_boss_budget",
  );
  if (error_calculate_boss_budget) {
    rollbarError(`recalculateBossBudget error: ${error_calculate_boss_budget.message}`);
    throw error_calculate_boss_budget;
  } else {
    rollbarInfo("recalculateBossBudget successful");
  }
}
