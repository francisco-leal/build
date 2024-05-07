import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const getAppUserStats = unstable_cache(
  async (wallet: string) => {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("wallet", wallet)
      .throwOnError()
      .single();

    if (!data) throw notFound(); // TODO: replace with null object
    return data;
  },
  ["app-user-stats"],
  { revalidate: 60 },
);

export const getCurrentUserAppStats = async () => {
  const user = await getSession();

  if (!user) return notFound(); // TODO: replace with null object
  return getAppUserStats(user.wallet);
};

export const isUserConnected = async () => {
  return await getCurrentUserAppStats()
    .then(() => true)
    .catch(() => false);
};