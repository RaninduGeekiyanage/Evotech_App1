"use server";

import { db } from "@/lib/mongodb";

export const getUsers = async () => {
  try {
    const users = await db.collection("user").find({}).toArray();
    return users; // No need to wrap in an object, return plain array
  } catch (error) {
    console.error("Failed to fetch users from MongoDB:", error);
    throw new Error("Failed to fetch users");
  }
};
