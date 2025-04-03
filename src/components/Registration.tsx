"use client";
import React, { useState } from "react";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SocialIcon } from "react-social-icons";

export default function Registration() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    if (name === "username") {
      if (!value) {
        errorMsg = "Username is required";
      } else if (value.length < 2) {
        errorMsg = "Username must be more than 1 character";
      }
    } else if (name === "email") {
      if (!value) {
        errorMsg = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errorMsg = "Invalid email format";
      }
    } else if (name === "password") {
      if (!value) {
        errorMsg = "Password is required";
      } else if (value.length < 8) {
        errorMsg = "Password must be at least 8 characters long";
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(value)) {
        errorMsg = "At least one letter and one number";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        errorMsg = "Please repeat password";
      } else if (value !== formData.password) {
        errorMsg = "Password doesn't match";
      }
    }
    return errorMsg;
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      username: validateField("username", formData.username),
      email: validateField("email", formData.email),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
    };
    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((value) => value !== "");
    if (hasError) {
      alert("Form has errors");
      return
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (result.success) {
        alert(`${result.message}`);
        router.push("/login");
      } else {
        alert(`${result.message}`);
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      alert("An error occurred during registration");
    }
  };
  return (
    <div className="max-w-[370px] w-full">
      <h2 className="text-2xl font-bold text-custom-dark-brown mb-4">
        Registration
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter your username"
            className="w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          />
          {errors.username && (
            <p className="text-sm text-red-600 px-2 absolute left-0">
              {errors.username}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Enter your email"
            className="w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-600 px-2 absolute left-0">
              {errors.email}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Create password"
            className="relative w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2  text-xl"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <IoEyeOutline />}
          </span>
          {errors.password && (
            <p className="text-sm text-red-600 px-2 absolute left-0">
              {errors.password}
            </p>
          )}
        </div>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="Confirm password"
            className="w-full text-lg py-2 px-2 rounded-xl border border-b-custom-yellow-2 border-b-4 focus:border-custom-brown-1 focus:outline-none"
          />
          <span
            className="absolute right-2 top-1/2 -translate-y-1/2  text-xl"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <IoEyeOutline />}
          </span>

          {errors.confirmPassword && (
            <p className="text-sm text-red-600 px-2 absolute left-0">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <div>
          <input type="hidden" name="created_at" />
        </div>
        <div>
          <input
            type="submit"
            value="Join Handcrafted-Haven"
            className="w-full bg-custom-dark-brown text-white py-2 rounded-xl text-lg font-bold mt-8 cursor-pointer hover:bg-custom-brown-1"
          />
        </div>
      </form>
      <div className="space-y-2">
        <p className="text-center">OR</p>
        <div
          onClick={() => signIn("google", {callbackUrl: "/"})}
          className="flex items-center rounded-lg border border-gray-400 hover:shadow-md cursor-pointer"
        >
          <div className="w-12 text-xl p-2">
            <FcGoogle />
          </div>
          <p>Sign in with Google</p>
        </div>
        <div
          onClick={() => signIn("facebook", {callbackUrl: "/"})}
          className="flex items-center rounded-lg border border-gray-400 hover:shadow-md cursor-pointer"
        >
          <div className="w-12 text-xl p-2">
            <SocialIcon
              network="facebook"
              style={{ width: 20, height: 20 }}
              label="My Facebook channel"
            />
          </div>
          <p>Sign in with Facebook</p>
        </div>
      </div>
    </div>
  );
}
