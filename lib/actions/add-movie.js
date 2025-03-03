"use server";

import { db } from "@/lib/mongodb";
import { movieSchema } from "../validation/movieSchema";

export const createMovie = async (movie) => {
  try {
    // Validate movie data before inserting
    const validationResult = movieSchema.safeParse(movie);
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0].message,
      };
    }

    // const client = await clientPromise();
    // const db = client.db("sample_mflix");

    const exsistingMovie = await db
      .collection("movies-n")
      .findOne({ title: movie.title });

    if (exsistingMovie) {
      return {
        success: false,
        message: "The Movie alrready exsist..!",
      };
    }

    // if not movie already in the db..
    const result = await db.collection("movies-n").insertOne(movie);

    if (result.acknowledged) {
      return {
        success: true,
        message: "Movie added successfully",
        insertedId: result.insertedId.toString(), // Convert ObjectId to string
      };
    } else {
      return {
        success: false,
        message: "Move save unsuccessfull..!",
      };
    }
  } catch (error) {
    console.error("Mongodb insert fail", error);
    return { success: false, message: "Failed to add movie" };
  }
};
