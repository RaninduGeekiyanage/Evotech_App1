'use server'
import { db } from "@/lib/mongodb";

export const dailyMoviesCount = async () => {
    try {
      const movieCollection = db.collection("movies-n");

      // Get the current date in UTC
      const now = new Date();
      const startOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
      const endOfDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));


       // Count movies added today
      const count = await movieCollection.countDocuments({
        addedAt: { $gte: startOfDay, $lt: endOfDay }
      });
  
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
  