import { type NextRequest } from 'next/server'
import { supabase } from '../../db'

export async function GET(request: NextRequest) {

    let { data: app_user, error } = await supabase
        .from('app_user')
        .select('*')
        .eq('wallet_address', request.nextUrl.searchParams.get('wallet_address')!);


    if (error || !app_user || app_user.length === 0) {
        return Response.json({}, { status: 404 })
    }

    return Response.json(app_user[0])
}

export async function POST(request: NextRequest) {
    const { wallet_address } = await request.json()

    // TODO: generate a referral code

    const { data, error } = await supabase
        .from('app_user')
        .insert([
            { wallet_address },
        ])
        .select()


    if (error || !data || data.length === 0) {
        return Response.json({}, { status: 404 })
    }

    return Response.json(data[0])
}

export async function PUT(request: NextRequest) {
    const res = await request.json()
    return Response.json({ res })
}