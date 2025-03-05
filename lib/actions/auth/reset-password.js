"use server";

import { db } from "@/lib/mongodb";
import { hashPassword } from "@/utils/passwordUtils";
import { ObjectId } from "mongodb";


export async function resetPassword(token, newPassword) {


  // Find the reset token from the database
  const resetToken = await db
    .collection("password_reset_tokens")
    .findOne({ token });

  if (!resetToken || resetToken.expiresAt < new Date()) {
    return { error: "Invalid or expired token" };
  }

  // Hash the new password using hashPassword from passwordUtils.ts
  const hashedPassword = await hashPassword(newPassword);

  // Convert string userId to ObjectId
  const userIdObjectId = new ObjectId(resetToken.userId);

  // Update the password in the `account` collection
  await db
    .collection("account")
    .updateOne(
      { userId: userIdObjectId },
      { $set: { password: hashedPassword } }  // Update the password with the hashed one
    );

  // Optionally, delete the reset token after updating the password
  await db.collection("password_reset_tokens").deleteOne({ token });

  return { 
    message: "Password updated successfully"
   };

  
}
