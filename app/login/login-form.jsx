"use client";
import Link from "next/link";
//Client component for CSR

import { useState } from "react";

export default function LoginForm() {
  // setter functions for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", { email: email, passowrd: password });
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            Sign in to Evotech
          </h3>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@email.com"
              className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Your Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          {/* remember me */}
          <div className="flex justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="remember"
                  className="bg-gray-50 border border-gray-300 focus: ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                />
              </div>

              <div className="text-sm ml-3">
                <label htmlFor="remember" className="font-medium text-gra-900">
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="/forget-password"
              className="text-sm text-blue-700 hover:underline font-medium"
            >
              Lost Password?
            </a>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign In
          </button>

          {/* Dont have account */}

          <div className="flex justify-center text-sm font-medium text-gray-500 space-x-1">
            <span>Not registerd?</span>
            <Link href="/register" className="text-blue-700 hover:underline">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}