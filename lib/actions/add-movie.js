"use server";

import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export const createMovie = async (movie) => {
    try {
        const client = await clientPromise();
        const db = client.db("sample_mflix");
        const result = await db.collection("movies-n").insertOne(movie);

        return {
            success: true,
            message: "Movie added successfully",
            insertedId: result.insertedId.toString(), // Convert ObjectId to string
        };
    } catch (error) {
        console.error("Mongodb insert fail", error);
        return { success: false, message: "Failed to add movie" };
    }
};
