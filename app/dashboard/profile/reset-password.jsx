"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Add useRouter
import { resetPassword } from "@/lib/actions/auth/reset-password";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Initialize useRouter for redirection

  const validatePassword = (password) => {
    const hasMinimumLength = password.length >= 6;
    const hasNumbers = /\d/.test(password);
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasSpecialCharacters = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinimumLength && hasNumbers && hasLetters && hasSpecialCharacters;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validatePassword(password)) {
      setMessage("Password must be at least 6 characters long, and include numbers, letters, and special characters.");
      return;
    }
    
    const response = await resetPassword(token, password);
    
    if (response.message) {
      setMessage(response.message);
      toast(response.message);
      // Redirect to landing page ("/") on success
      router.push("/");
    } else if (response.error) {
      setMessage(response.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-48 p-6 border rounded-lg shadow">
      <h2 className="text-lg font-bold">Reset Password</h2>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
}
