import { supabase } from '@/db';
import { getSession } from '@/services/authentication/cookie-session';
import { getBuilderScore } from '@/services/talent-protocol';

export async function PATCH() {
    const user = await getSession();

    if (!user) {
        return Response.json({ error: 'user not connected!' }, { status: 401 });
    }
    const builderScore = await getBuilderScore(user.userWalletAddress);
    const { data: user_personal_stats, error } = await supabase
        .from('app_user_stats')
        .update({ builder_score: builderScore })
        .eq('user_id', user.userId)
        .select()
        .single();

    if (error || !user_personal_stats) {
        return Response.json({ error }, { status: 404 });
    }

    return Response.json(user_personal_stats);
}
