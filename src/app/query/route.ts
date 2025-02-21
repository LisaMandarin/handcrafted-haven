import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
async function listData() {
    const result = await sql`
        SELECT * FROM artisans
        ORDER BY RANDOM()
        LIMIT 1
    `
    return result.rows[0]
}

export async function GET() {
    try {
        const data = await listData();
        return NextResponse.json({data}, {status: 200})
        
    } catch (error) {
        return NextResponse.json({ error}, {status: 500})
    }
}