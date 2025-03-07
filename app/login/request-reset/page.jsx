"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/lib/actions/auth/request-password-reset";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await requestPasswordReset(email);
    setMessage(response.message || response.error);
  };

  return (
    <div className="max-w-md pt-4 mx-auto mt-44 border rounded-lg shadow bg-neutral-900">
      <div className="m-6">      
      <h2 className="text-lg font-bold p-5">Forgot Password?</h2>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
      </div>
    </div>  
  );
}
