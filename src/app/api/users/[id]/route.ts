import { sql } from "@vercel/postgres"
import { ParamsType } from "@/types/data"
import { NextResponse } from "next/server"

async function fetchUser(id: string) {
    const result = await sql`
        SELECT u.username, u.email, u.created_at, u.password AS hashedPassword 
        FROM users u
        WHERE u.id = ${id}
        LIMIT 1
    `
    return result.rows[0] || null 
}

export async function GET(req: Request, {params} : {params: Promise<ParamsType>}) {
    try {
        const {id} = await params;
        if (!id) {
            return NextResponse.json({
                message: "ID is missing",
                data: null
            }, {status: 400})
        }

        const result = await fetchUser(id)
        if (result.length === 0) {
            return NextResponse.json({
                message: `User ${id} not found`,
                data: null
            }, {status: 404})
        }

        return NextResponse.json({
            message: `Fetch user ${id} successfully`,
            data: result
        })
    } catch (error) {
        return NextResponse.json({
            message: "Server Error",
            error
        }, {status: 500})
    }
}