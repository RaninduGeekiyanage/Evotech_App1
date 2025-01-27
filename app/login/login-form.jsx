"use client";
import { signIn } from "@/lib/auth-client";
import Link from "next/link";
//Client component for CSR

import { useState } from "react";
import { loginUser } from "@/lib/apis/server";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  // setter functions for input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State for successful login

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    //check the formValidation is valid then form submittion continue
    if (isValid) {
      //Below this line - Login form data submission
      // console.log("Form Data", { email: email, passowrd: password });

      // calling the loginUser server action
      // const login = await loginUser({ email: email, password: password }); // pass the user data in to server action -> loginUser
      // if (login.success) {
      //   setLoginSuccess(true); // Set login success to true
      //   console.log("LOGIN RESPONSE", login);
      // } else {
      //   // Handle login failure here (e.g., show error message)
      // }

      setIsLoading(true);
      await signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            redirect("/dashboard");
          },
          onError: (ctx) => {
            console.log(ctx.error.message);
            setError(ctx.error.message);
          },
        }
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4">
        <form className="space-y-6 font-sans" onSubmit={handleSubmit}>
          {/* Title */}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            Sign in to MFLix
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
              autoComplete="off"
            />

            {/* Email error message */}
            {emailError && (
              <div className="text-red-600 text-sm mt-1">{emailError}</div>
            )}
            {error.error && (
              <span className="text-orange-500 text-xs text-center blink">
                {error.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Your Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-2 flex items-center"
              >
                {showPassword ? (
                  <LuEyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <LuEye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Password error message -> if there is passworderror then render password error to the div */}
            {passwordError && (
              <div className="text-red-600 text-sm mt-1">{passwordError}</div>
            )}

            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
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
            className="w-full text-green-500 bg-gray-900 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="animate-spin" />}
            <span>Sign In</span>
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
