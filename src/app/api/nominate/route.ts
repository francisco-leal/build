import { supabase } from '@/db'
import { getSession } from '@/services/authentication/cookie-session';
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const { nominated_user_address } = await request.json()
    const user = await getSession();

    if (!user) {
        return Response.json({}, { status: 401 })
    }

    let { data: nominated_user, error: error_find } = await supabase
        .from('app_user')
        .select('*')
        .eq('wallet_address', nominated_user_address);

    if (error_find || !nominated_user || nominated_user.length === 0) {
        return Response.json({}, { status: 404 })
    }

    const { data: nominated_result, error } = await supabase
        .from('app_daily_nominations')
        .insert({ user_id_from: user.userId, user_id_nominated: nominated_user[0].id })
        .select()

    if (error || !nominated_result || nominated_result.length === 0) {
        return Response.json({}, { status: 404 })
    }

    return Response.json(nominated_result[0])
}