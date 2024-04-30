import type { NextRequest } from 'next/server';
import { supabase } from '@/db';

export const revalidate = 0;

export async function GET(request: NextRequest) {
    let { data: user_nominations, error } = await supabase
        .from('user_nominations')
        .select('*')
        .eq('nominator_wallet_address', request.nextUrl.searchParams.get('wallet_address')!);

    if (error || !user_nominations || user_nominations.length === 0) {
        return Response.json({ error }, { status: 404 });
    }

    return Response.json(user_nominations);
}
