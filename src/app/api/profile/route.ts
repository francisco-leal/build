import type { NextRequest } from 'next/server';
import { supabase } from '@/db';
import { setSession } from '@/services/authentication/cookie-session';

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
        return Response.json({ error }, { status: 404 });
    }

    return Response.json(app_user[0]);
}

export async function POST(request: NextRequest) {
    const { wallet_address } = await request.json();
    let { data: app_user, error: error_find } = await supabase
        .from('app_user')
        .select('*')
        .eq('wallet_address', wallet_address);

    if (error_find) {
        return Response.json({ error: error_find }, { status: 404 });
    }

    if (!app_user || app_user.length === 0) {
        const { data, error: error_write } = await supabase
            .from('app_user')
            .insert({ wallet_address, referral_code: generateRandomSequence(16) })
            .select();

        if (error_write) {
            return Response.json({ error: error_write }, { status: 404 });
        }

        app_user = data;
    }

    await setSession({ userId: app_user[0].id, userWalletAddress: app_user[0].wallet_address });
    return Response.json(app_user[0]);
}

export async function PUT(request: NextRequest) {
    const res = await request.json();
    return Response.json({ res });
}
