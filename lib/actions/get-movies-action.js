"use server";

import { db } from "@/lib/mongodb";

export const getMovies = async () => {
  try {
    // const client = await clientPromise();
    // const db = client.db("sample_mflix");

    // Fetch movies sorted by `addedAt` in descending order (latest first)
    const movies = await db.collection("movies-n").find({}).sort({ addedAt: -1 }).toArray();

    return { success: true, data: movies };
  } catch (error) {
    console.error("Failed to fetch movies from MongoDB:", error);
    return { error: true, message: "Failed to fetch movies" };
  }
};
