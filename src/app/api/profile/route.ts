import type { NextRequest } from 'next/server';
import { supabase } from '@/db';
import { setSession } from '@/services/authentication/cookie-session';
import { createProfile } from './create';
import { SiweMessage } from 'siwe';
import { getSession } from '@/services/authentication/cookie-session';

export async function GET(request: NextRequest) {
    const user = await getSession();

    if (!user) {
        return Response.json({ error: 'user not connected!' }, { status: 401 });
    }

    return Response.json(user);
}

export async function POST(request: NextRequest) {
    const { siwe, wallet_address } = await request.json();

    const SIWEObject = new SiweMessage(siwe.message);

    const { data: message, error } = await SIWEObject.verify({ signature: siwe.signature, nonce: siwe.nonce });

    if (error) {
        return Response.json({ error }, { status: 404 });
    }

    let { data: app_user, error: error_find } = await supabase
        .from('app_user')
        .select('*')
        .eq('wallet_address', wallet_address);

    if (error_find) {
        return Response.json({ error: error_find }, { status: 404 });
    }

    if (!app_user || app_user.length === 0) {
        const { data, error: error_write } = await createProfile(wallet_address);

        if (error_write) {
            return Response.json({ error: error_write }, { status: 404 });
        }

        app_user = data;
    }

    await setSession({
        userId: app_user[0].id,
        userWalletAddress: app_user[0].wallet_address,
        siwe: {
            address: message.address,
            nonce: message.nonce,
            issuedAt: message.issuedAt,
            expirationTime: message.expirationTime
        }
    });
    return Response.json(app_user[0]);
}

export async function PUT(request: NextRequest) {
    const res = await request.json();
    return Response.json({ res });
}
