import { useEffect, useState } from "react";

type Session = {
  user: {
    id: string;
    email: string;
  };
};

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const response = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setSession(data);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error("Failed to fetch session: ", error);
      }
    }
    fetchSession();
  }, []);

  return session
}
