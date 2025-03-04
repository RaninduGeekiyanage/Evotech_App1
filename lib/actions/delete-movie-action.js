"use server";

import { db } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const deleteMovie = async (id) => {
  console.log("movie id", id);

  try {
    const result = await db
    .collection("movies-n")
    .deleteOne({_id: ObjectId.createFromHexString(id)},)

    console.log(`Movie deleted : ${result.deletedCount}`)

    if (result.deletedCount === 1) {
        return {
          success: true,
          message: "Movie Delete successfully",
         
        };
      } else {
        return {
          success: false,
          message: "Movie deletion unsuccessful..!, movie not found.",
        };
      }
  } catch (error) {
    console.error("Mongodb Delete fail", error);
    return { success: false, message: "Failed to Delete movie" };
  }
};
