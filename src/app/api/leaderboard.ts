import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
    return Response.json({ hello: 1 })
}