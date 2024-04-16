import { type NextRequest } from 'next/server'
import { supabase } from '@/db'

function generateRandomSequence(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export async function GET(request: NextRequest) {

    let { data: app_user, error } = await supabase
        .from('app_user')
        .select('*')
        .eq('wallet_address', request.nextUrl.searchParams.get('wallet_address')!);


    if (error || !app_user || app_user.length === 0) {
        return Response.json({ error }, { status: 404 })
    }

    return Response.json(app_user[0])
}

export async function POST(request: NextRequest) {
    const { wallet_address } = await request.json()

    const { data, error } = await supabase
        .from('app_user')
        .insert([
            { wallet_address, referral_code: generateRandomSequence(16) },
        ])
        .select()


    if (error || !data || data.length === 0) {
        return Response.json({ error }, { status: 404 })
    }

    return Response.json(data[0])
}

export async function PUT(request: NextRequest) {
    const res = await request.json()
    return Response.json({ res })
}