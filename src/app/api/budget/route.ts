import { calculateUserBudget, getUserFromWallet } from "@/app/_api/data/users";
import { restApiHandler } from "@/app/_api/helpers/rest-api-handler";

export const GET = restApiHandler(async (request, params) => {
  const wallet = request.nextUrl.searchParams.get("wallet") ?? undefined;

  if (!wallet) return { message: "no wallet" };
  console.log("wallet", wallet);

  const user = await getUserFromWallet(wallet);
  if (!user) return { message: "no user" };
  const budget = await calculateUserBudget(user, wallet);

  return { message: `new budget of ${user.username} is ${budget}` };
});
