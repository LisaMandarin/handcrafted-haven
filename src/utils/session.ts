import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
      const sessionToken = cookieStore.get("session_token")?.value;
      if (!sessionToken) return null
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`,
        {
          method: "GET",
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        }
      );
      const session = await response.json();
      return session?.user ? session : null

}