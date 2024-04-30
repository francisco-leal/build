import { supabase } from '@/db';

export const revalidate = 0;
export async function GET() {
    let { data: app_leaderboard, error } = await supabase.from('app_leaderboard_current').select('*');

    if (error || !app_leaderboard) {
        return Response.json({ error }, { status: 404 });
    }

    const userIds = app_leaderboard.map(user => user.user_id);

    const { data: users, error: userError } = await supabase
        .from('app_user')
        .select('id, wallet_address, username')
        .in('id', userIds);

    if (userError) {
        return Response.json({ error: userError }, { status: 404 });
    }

    const { data: userStats, error: statsError } = await supabase
        .from('app_user_stats')
        .select('user_id, boss_score, nominations, builder_score')
        .in('user_id', userIds);

    if (statsError) {
        return Response.json({ error: statsError }, { status: 404 });
    }

    return Response.json({
        leaderboard: app_leaderboard,
        users,
        userStats
    });
}
