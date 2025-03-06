'use server'
import { db } from "@/lib/mongodb";

export const userCount = async () => {
    try {
      const userCollection = db.collection("user");
      const count = await userCollection.countDocuments();
  
      return {
        success: true,
        count,
      };
    } catch (error) {
      console.error("MongoDB Error:", error);
      return {
        success: false,
        error: "Failed to fetch movie count",
      };
    }
  };
  