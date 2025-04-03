"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SocialIcon } from "react-social-icons";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // do something to sign in via NextAuth credential
    const result =await signIn("credentials", {
      redirect: true,
      email: formData?.email,
      password: formData?.password,
      callbackUrl: callbackUrl
    });

    if (result?.ok && result?.url) {
      window.location.href = result.url;
    }
  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
  }
  useEffect(() => {
    if (error === "UserNotFound") {
      router.push("/signup")
    }
  }, [error])

  return (
    <div className="max-w-[370px] w-full">
      <h2 className="text-2xl font-bold text-custom-dark-brown mb-4">Login</h2>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Enter your email"
              className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
            />
          </div>
          <div>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full text-lg p-2 rounded-xl border border-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
            />
          </div>
          <button className="w-full text-lg p-2 rounded-xl text-white bg-custom-yellow-2 active:bg-custom-brown-1">Log In</button>
        </form>
        <p className="text-center hover:underline text-blue-600"><Link href="/signup">Don&apos;t have an account yet?</Link></p>
        <p className="text-center">OR</p>
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
