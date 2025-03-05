"use server";
import crypto from "crypto";
import { db } from "@/lib/mongodb";
import { sendEmail } from "@/lib/mail";



export async function requestPasswordReset(email) {
    

  const user = await db.collection("user").findOne({ email });

  if (!user) {
    return { error: "User not found" };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 3600000); // Token expires in 1 hour

  await db.collection("password_reset_tokens").insertOne({
    userId: user._id.toString(),
    token: resetToken,
    expiresAt,
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login/reset-password?token=${resetToken}`;
  await sendEmail(user.email, "Password Reset", `Click here to reset: ${resetUrl}`);

  return { message: "Password reset link sent to your email" };
}
