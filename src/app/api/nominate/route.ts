import { supabase } from '@/db';
import { searchSocialUser } from '@/services';
import { getSession } from '@/services/authentication/cookie-session';
import { type NextRequest } from 'next/server';
import { createProfile } from '@/app/api/profile/create';

export async function POST(request: NextRequest) {
    const { nominated_user_address } = await request.json();
    const user = await getSession();

    if (!user) {
        return Response.json({}, { status: 401 });
    }

    // find user and limits
    const [
        { data: nominated_user, error: error_find },
        { data: user_max_nominations, error: error_user_max_nominations }
    ] = await Promise.all([
        supabase.from('app_user').select('*').eq('wallet_address', nominated_user_address),
        supabase.from('app_user').select('max_nominations').eq('id', user.userId).single()
    ]);

    if (error_find) {
        return Response.json({ error: error_find }, { status: 404 });
    }

    if (error_user_max_nominations) {
        return Response.json({ error: error_user_max_nominations }, { status: 404 });
    }

    if (!nominated_user || nominated_user.length === 0) {
        const profiles = await searchSocialUser(nominated_user_address);
        if (profiles.length === 0) {
            return Response.json({ error: 'user not found' }, { status: 404 });
        }
        const { error: error_write } = await createProfile(nominated_user_address);

        if (error_write) {
            return Response.json({ error: error_write }, { status: 404 });
        }
    }

    // validate user nominating user and limits
    const [
        { data: user_nominated_user, error: error_user_nominated_user },
        { data: user_daily_nominated_users, error: error_user_daily_nominated_users }
    ] = await Promise.all([
        supabase
            .from('app_nominations')
            .select('id')
            .eq('user_id_from', user.userId)
            .eq('user_id_nominated', nominated_user[0].id),
        supabase.from('app_daily_nominations').select('user_id_nominated').eq('user_id_from', user.userId)
    ]);

    if (error_user_nominated_user) {
        return Response.json({ error: error_user_nominated_user }, { status: 404 });
    }

    if (error_user_daily_nominated_users) {
        return Response.json({ error: error_user_daily_nominated_users }, { status: 404 });
    }

    if (
        user_daily_nominated_users &&
        user_max_nominations &&
        user_daily_nominated_users.length >= user_max_nominations.max_nominations
    ) {
        return Response.json({ error: 'user has reached the daily nomination limit' }, { status: 400 });
    }

    if (user_nominated_user && user_nominated_user.length > 0) {
        return Response.json({ error: 'can not nominate same user twice' }, { status: 400 });
    }

    if (nominated_user[0].id === user.userId) {
        return Response.json({ error: 'can not nominate yourself' }, { status: 400 });
    }

    // insert nomination
    const { data: nominated_result, error } = await supabase
        .from('app_daily_nominations')
        .insert({ user_id_from: user.userId, user_id_nominated: nominated_user[0].id })
        .select();

    if (error || !nominated_result || nominated_result.length === 0) {
        return Response.json({}, { status: 404 });
    }

    return Response.json(nominated_result[0]);
}
