//movie related server actions
"use server"

import clientPromise from "@/lib/mongodb";

export const createMovie = async (movie) => {
    try {
        const client = await clientPromise();
        const db = client.db("sample_mflix");
        const result = await db.collection("movies-n").insertOne(movie)

        console.log(`A movie was inserted with the _id:  ${result.insertedId}` )
    } catch (error) {
        console.log("Mongodb insert fail", error)
    }
}