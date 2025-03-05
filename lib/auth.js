// lib/auth.ts
import { hashPassword, verifyPassword } from "@/utils/passwordUtils";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendEmail } from "./mail";
import { db } from "./mongodb";

async function setupDatabase() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI environment variable is not defined");
  }

  try {
    // Initialize MongoDB connection


    // Setup Better-Auth with MongoDB adapter
    return betterAuth({
      database: mongodbAdapter(db),
      emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        sendResetPassword: async ({ user, url, token }) => {
          const resetUrl = `${url}?token=${token}`; // Append token to URL
          await sendEmail({
            to: user.email,
            subject: "Reset your password",
            text: `Click the link to reset your password: ${resetUrl}`,
          });
        },
        password: {
          hash: hashPassword, // Custom hash function
          verify: verifyPassword, // Custom verify function
        },
      },
      trustedOrigins: ["*"], // Trusted origins
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
}

export const auth = await setupDatabase();

// import { betterAuth } from "better-auth";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";
// import {db} from '@/lib/mongodb'

// export const auth = betterAuth({
//   //flug the database instance
//   database: mongodbAdapter(db), // (this is like link the database true auth. means database can handle by AUTH)
//   emailAndPassword: {
//     enabled: true,
//   },
//   google: {
//     clientId: process.env.GOOGLE_CLIENT_ID, 
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
//   }

// });
