import { SessionType } from "@/types/data";

type LogoutType = {
    setSession: (session: SessionType | null) => void
    router: {
        refresh: () => void
    }
}

export const handleLogout = async ({setSession, router}: LogoutType) => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setSession(null);
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };