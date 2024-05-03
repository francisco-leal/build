import { supabase } from "@/db";
import { getSession } from "@/services/authentication/cookie-session";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

export const getAppUserStats = unstable_cache(
  async (id) => {
    const { data } = await supabase
      .from("app_user_stats")
      .select("*")
      .eq("user_id", id)
      .throwOnError()
      .single();
    if (!data) throw notFound();
    return data;
  },
  ["app-user-stats"],
  { revalidate: 60 },
);

export const getCurrentUserAppStats = async () => {
  const user = await getSession();
  if (!user) return notFound();
  return getAppUserStats(user.userId);
};

export const isUserConnected = async () => {
  return await getCurrentUserAppStats()
    .then(() => true)
    .catch(() => false);
};
