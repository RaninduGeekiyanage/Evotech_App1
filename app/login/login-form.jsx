"use client";
import Link from "next/link";
//Client component for CSR

import { useState } from "react";

export default function LoginForm() {
  // setter functions for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // form validation using basic java script
  const validateForm = () => {
    if (!email) {
      //set error message to setter function -> setEmailError
      setEmailError("Email is required..!");
      return false; // if there is error formValidity is set False
    } else {
      setEmailError(""); // if no errors then set error mrssage empty
    }
    if (!password) {
      //set error message to setter function -> setEmailError
      setPasswordError("Password is required..!");
      return false; // if there is error formValidity is set False (return)
    } else {
      setPasswordError(""); // if no errors then set error mrssage empty
    }

    return true; // if there is no errors then formVlaidity is set True (isValid = true)
  };

  //   submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    //check the formValidation is valid then form submittion continue
    if (isValid) {
      //Below this line - Login form data submission
      console.log("Form Data", { email: email, passowrd: password });
    }
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
            {/* Email error message */}
            {emailError && (
              <div className="text-red-600 text-sm mt-1">{emailError}</div>
            )}
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

            {/* Password error message -> if there is passworderror then render password error to the div */}
            {passwordError && (
              <div className="text-red-600 text-sm mt-1">{passwordError}</div>
            )}
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
