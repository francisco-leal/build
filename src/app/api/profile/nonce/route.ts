import { generateNonce } from 'siwe';

export async function GET() {
    const nonce = generateNonce();

    return Response.json({ nonce });
}
