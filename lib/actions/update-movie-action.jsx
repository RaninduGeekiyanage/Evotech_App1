"use server";

import  { db } from "@/lib/mongodb";
import { movieSchema } from "../validation/movieSchema";
import { ObjectId } from "mongodb";

export const updateMovie = async (id, movie) => {
    console.log("movie", movie)
  try {
    // Validate movie data before inserting
    const validationResult = movieSchema.safeParse(movie);
    if (!validationResult.success) {
      return {
        success: false,
        message: validationResult.error.errors[0].message,
      };
    }

    // Convert id to ObjectId
    const objectId = ObjectId.createFromHexString(id);

    

    const result = await db.collection("movies-n").updateOne({_id: objectId}, {$set: movie}, { upsert: true});

    if (result.acknowledged) {
      return {
        success: true,
        message: "Movie Update successfully",
       // insertedId: result.upsertedId.toString(), // Convert ObjectId to string
      };
    } else {
      return {
        success: false,
        message: "Move Update unsuccessfull..!",
      };
    }
  } catch (error) {
    console.error("Mongodb insert fail", error);
    return { success: false, message: "Failed to Update movie" };
  }
};
