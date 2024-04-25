import { supabase } from '@/db';

export async function GET() {
    let { data: app_leaderboard, error } = await supabase.from('app_leaderboard').select('*');

    if (error || !app_leaderboard) {
        return Response.json({}, { status: 404 });
    }

    return Response.json(app_leaderboard);
}
