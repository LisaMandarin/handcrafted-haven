import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { encode } from "next-auth/jwt";
import { cookies } from "next/headers";


async function login(email: string, password: string) {
  const result = await sql`
            SELECT * from users
            WHERE email = ${email}
            LIMIT 1
        `;

  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }

  return user;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password are required",
          data: null,
        },
        { status: 400 }
      );
    }

    const user = await login(email, password);

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
          data: null,
        },
        { status: 401 }
      );
    }

    const token = await encode({
      token: {id: user.id, email: user.email},
      secret: process.env.SESSION_SECRET || '',
    })

    const cookieStore = await cookies();
    cookieStore.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60*60,  // 1 hr
      sameSite: 'strict',
      path: '/',
    })
    
    return NextResponse.json(
      {
        message: "Log in successfully",
        user: {email: user.email, id: user.id},
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Failed to log in.  Server Error: ${error}`,
        data: null,
      },
      { status: 500 }
    );
  }
}
