import { generateNonce } from 'siwe';

export const revalidate = 0;

export async function GET() {
    const nonce = generateNonce();

    return Response.json({ nonce });
}
