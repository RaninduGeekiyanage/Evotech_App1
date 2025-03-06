"use server";

import { db } from "@/lib/mongodb";

export async function getMonthlyAddedMovie() {
  try {    

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Get the month name
    const monthName = startOfMonth.toLocaleString("en-US", { month: "long" });

    // Fetch job completion counts from DB
    const movies = await db.collection("movies-n").aggregate([
      {
        $match: {          
          addedAt: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$addedAt" } },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.day": 1 },
      },
    ]).toArray();

    // Convert to a dictionary for easy lookup
    const movieDataMap = new Map(movies.map(movie => [movie._id.day, movie.count]));

    // Generate full month data including empty days
    const fullMonthData = Array.from({ length: daysInMonth }, (_, i) => ({
      date: `${i + 1}`, // Day of the month as string
      count: movieDataMap.get(i + 1) || 0, // Use DB count or 0 if no jobs
    }));

  //  console.log("fullMonthData",fullMonthData)

    return {
      month: monthName,  // Sending the month name
      year: year,        // Sending the year for reference
      data: fullMonthData, // Sending the daily movie count data
    };
  } catch (error) {
    console.error("Error fetching monthly completed jobs:", error);
    return [];
  }
}
