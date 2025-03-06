"use server";

import { db } from "@/lib/mongodb";

export async function getMovieGenreCount() {
  try {
    // Step 1: First, get the total number of unique movies
    const totalMovies = await db
      .collection("movies-n")
      .distinct("_id"); // Get distinct movie IDs
    const totalMoviesCount = totalMovies.length; // Count the total unique movies

    // Step 2: Aggregate movie genre counts based on unique movies
    const genreCounts = await db
      .collection("movies-n")
      .aggregate([
        {
          $unwind: "$genres", // Unwind the genres array to separate each genre
        },
        {
          $group: {
            _id: "$_id", // Group by movie ID to avoid counting the same movie multiple times
            genres: { $addToSet: "$genres" }, // Collect unique genres for each movie
          },
        },
        {
          $unwind: "$genres", // Unwind genres again to separate them for counting
        },
        {
          $group: {
            _id: "$genres", // Group by each genre
            count: { $sum: 1 }, // Count how many unique movies have each genre
          },
        },
        {
          $project: {
            genre: "$_id", // Project genre name
            count: 1, // Project count
            _id: 0, // Don't include _id
          },
        },
        {
          $sort: { count: -1 }, // Sort by count descending
        }
      ])
      .toArray();

    // Return both total movie count and genre counts
    return { totalMoviesCount, genreCounts };
  } catch (error) {
    console.error("Error fetching movie genre counts:", error);
    return { totalMoviesCount: 0, genreCounts: [] };
  }
}
