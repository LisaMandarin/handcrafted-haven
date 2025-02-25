import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        {
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    const decoded = await decode({
      token,
      secret: process.env.SESSION_SECRET || "",
    });

    if (!decoded) {
      return NextResponse.json(
        {
          message: "Invalid or expired session",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Authenticated",
        user: decoded,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Server Error: ${error}`,
      },
      { status: 500 }
    );
  }
}
