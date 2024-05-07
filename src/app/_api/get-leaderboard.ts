import { supabase } from "@/db";
import { getCurrentUser } from "./get-user";
import { unstable_cache } from "next/cache";

export const getLeaderboard = unstable_cache(
    async () => {
        const user = await getCurrentUser();

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

        return leaderboard;
    },
    ["leaderboard"],
    { revalidate: 60 }
);