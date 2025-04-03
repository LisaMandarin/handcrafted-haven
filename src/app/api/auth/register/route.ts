import { sql } from "@vercel/postgres";
import {v4 as uuidv4} from 'uuid'
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

type formDataType = {
    username: string;
    email: string;
    password: string;
}
async function addUser(formData: formDataType) {
    const {username, email, password} = formData;
    const existingUser = await sql`
        SELECT * FROM users WHERE email = ${email}
    `
    if (existingUser.rows.length > 0) {
        throw new Error ("User already exists")
    }
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10)
    const date = new Date().toISOString();
    const result = await sql`
        INSERT INTO users (id, username, email, password, created_at)
        VALUES (${id}, ${username}, ${email}, ${hashedPassword}, ${date})
    `
    return result.rowCount ?? 0
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        if (!body) {
            return NextResponse.json({
                message: "Invalid form data to create a user account"
            }, {status: 400})
        }
        const result = await addUser(body)
        if (result) {
            return NextResponse.json({
                success: true,
                message: "Add user successfully",
                data: result
            }, { status: 201})
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            if (error.message === "User already exists") {
                return NextResponse.json({
                    message: error.message
                }, {status: 400})
            }
            return NextResponse.json({
                message: `Server error: ${error.message}`
            }, {status: 500})
        }
    }
}