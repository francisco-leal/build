import { searchSocialUser } from '@/services'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')

    if (!query || query.length < 3) {
        return Response.json({}, { status: 400 })
    }

    return Response.json(await searchSocialUser(query))
}