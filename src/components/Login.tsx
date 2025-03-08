"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SocialIcon } from "react-social-icons";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"
    
  return (
    <div className="max-w-[370px] w-full">
      <h2 className="text-2xl font-bold text-custom-dark-brown mb-4">Login</h2>
      <div className="space-y-4">
        <div onClick={() => signIn("google", {callbackUrl: callbackUrl })} className="flex items-center rounded-lg border border-gray-400 hover:shadow-md cursor-pointer">
          <div className="w-12 text-xl p-2"><FcGoogle /></div>
          <p>Sign in with Google</p>
        </div>
        <div onClick={() => signIn("facebook", {callbackUrl: callbackUrl })} className="flex items-center rounded-lg border border-gray-400 hover:shadow-md cursor-pointer">
          <div className="w-12 text-xl p-2"><SocialIcon network="facebook" style={{width: 20, height: 20}} label="My Facebook channel" /></div>
          <p>Sign in with Facebook</p>
        </div>
      </div>

      
    </div>
  );
}
