import { type NextRequest } from 'next/server'

export function GET(request: NextRequest) {
    return Response.json({ hello: 1 })
}

export async function POST(request: NextRequest) {
    const res = await request.json()
    return Response.json({ res })
}

export async function PUT(request: NextRequest) {
    const res = await request.json()
    return Response.json({ res })
}