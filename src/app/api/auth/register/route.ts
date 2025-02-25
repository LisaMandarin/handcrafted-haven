import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

async function registerUser(formData: FormData) {
  try {
    const { username, email, password } = formData;
    const id = uuidv4();
    const hashedPW = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();

    const result = await sql`
        INSERT INTO users (id, username, email, password, created_at)
        VALUES (${id}, ${username}, ${email} ,${hashedPW}, ${created_at})
        ON CONFLICT (email) DO NOTHING
    `;

    if (result.rowCount === 0) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    return {
      success: true,
      message: "User registered successfully"
    };
  } catch (error) {
    return {
      success: false,
      message: "Server Error",
      error: error instanceof Error ? error.message : error,
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await registerUser(body);

    if (!result.success) {
      return NextResponse.json({
        message: result.message,
        success: false
      }, {status: 400})
    } else {
      return NextResponse.json({
        message: result.message,
        success: true
      }, {status: 201})
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Invalid request",
        success: false,
        error,
      },
      { status: 500 }
    );
  }
}
