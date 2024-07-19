import { calculateUserBudget, getUserFromWallet } from "@/app/_api/data/users";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";
import { supabase } from "@/db";

export const GET = restApiHandler(async (request, params) => {
  const wallet = request.nextUrl.searchParams.get("wallet") ?? undefined;

  if (!wallet) return { message: "no wallet" };

  const user = await getUserFromWallet(wallet);
  if (user === null) {
    return { budget: null };
  }

  try {
    const budget = await calculateUserBudget(user, wallet);

    console.log(`new budget of ${user.username} is ${budget}`);
    return { budget: budget };
  } catch {
    console.log(`failed to calculate budget for ${user.username}`);
    await supabase
      .from("users")
      .update({ boss_budget: 0, last_budget_calculation: null })
      .eq("id", user.id);

    return { budget: 0 };
  }
});
