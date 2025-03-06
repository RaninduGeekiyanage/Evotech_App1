'use server'
import { db } from "@/lib/mongodb";

export const movieCount = async () => {
    try {
      const movieCollection = db.collection("movies-n");
      const count = await movieCollection.countDocuments();
  
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
  