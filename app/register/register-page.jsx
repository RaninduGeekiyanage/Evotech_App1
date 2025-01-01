"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassowrd, setRePassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any form validation or API calls here
    if (!email) {
      alert("Email is required");
    } else if (!password) {
      console.log("Password is required");
      alert("Password is required");
    } else if (password !== rePassowrd) {
      console.log("Password is not matching..!");
      alert("Password is not matching..!");
    } else {
      alert("Account successfully created");
      router.push("/login");
    }
  };
  return (
    <div className="w-[380px] mx-auto">
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4">
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            Register an Account
          </h3>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Enter Your Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="yourname@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Enter Your Password
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

          {/* Re-type Password */}
          <div>
            <label
              htmlFor="rePassword"
              className="text-sm font-medium text-gray-900 block mb-2 "
            >
              Re-Enter your password
            </label>
            <input
              type="rePassword"
              name="rePassword"
              id="rePassword"
              placeholder="Re-type password"
              value={rePassowrd}
              onChange={(e) => setRePassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
