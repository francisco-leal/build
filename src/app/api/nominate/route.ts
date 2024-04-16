import { supabase } from '@/db'
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
    const { nominator_user_id, nominated_user_id } = await request.json()

    const { data, error } = await supabase
        .from('app_daily_nominations')
        .insert([
            { user_id_from: nominator_user_id, user_id_nominated: nominated_user_id },
        ])
        .select()

    if (error || !data || data.length === 0) {
        return Response.json({}, { status: 404 })
    }

    return Response.json(data)
}