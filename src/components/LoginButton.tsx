"use client";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const router = useRouter();

  const handleRedirect = () => {
    const currentUrl = window.location.href;
    const redirectedLink = `/login?callbackUrl=${encodeURIComponent(currentUrl)}`
    router.push(redirectedLink);
  };
  return <button onClick={handleRedirect}>Log In</button>;
}
