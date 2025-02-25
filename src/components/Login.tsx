"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();  
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isEmpty = (value: string) => !value;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const values = Object.values(formData);
    const hasError = values.some((value) => isEmpty(value));

    if (hasError) {
      alert("Please enter email and password");
      return;
    }

    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })
      
      if (!result?.ok) {
        alert('Invalid email or password')
        return;
      } else {
        alert('Logged in successfully')
        router.replace(callbackUrl)
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[370px] w-full">
      <h2 className="text-2xl font-bold text-custom-dark-brown mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Enter password"
            className="w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
            required
          />
        </div>
        <div>
          <input
            type="submit"
            value="Log In"
            className="w-full bg-custom-dark-brown text-white py-2 rounded-xl text-lg font-bold mt-8 cursor-pointer hover:bg-custom-brown-1"
          />
        </div>
      </form>
    </div>
  );
}
