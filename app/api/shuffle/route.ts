import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { members } = await req.json() as { members: string[] };
    const result = members.sort(() => Math.random() - 0.5);
    return NextResponse.json({ members: result })
}
