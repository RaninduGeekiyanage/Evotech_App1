"use client";

import { useState } from "react";
import { requestPasswordReset } from "@/lib/actions/auth/request-password-reset";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RequestResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { data: session } = useSession();  // Move the hook call here, at the top level of the component
  const router = useRouter();  // Router should also be initialized here

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await requestPasswordReset(email);
    setMessage(response.message || response.error);

    console.log("response", response);

    // Now check if the response message indicates success
    if (response.message && response.message.includes("Password reset link sent to your email")) {
      console.log("Session", session); // You can now safely log the session
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
        },
      });
    }
  };

  return (
    <div className="max-w-md pt-4 mx-auto mt-44 border rounded-lg shadow">
      <h2 className="text-lg font-bold">Reset Password</h2>
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
        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
