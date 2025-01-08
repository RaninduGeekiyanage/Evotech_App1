import clientPromise from "@/app/libs/mongodb";
// import { NextResponse } from "next/server";

export const GET = async () => {
  //Get movies from nongo db

  try {
    const client = await clientPromise();

    if (!client) {
      console.error("MongoClient not initialized");
      throw new Error("MongoClient not initialized");
    }

    console.log("MongoClient initialized:", !!client);

    //sample_mflix is the database name
    const db = client.db("sample_mflix");

    console.log("Database connection established");

    //fetch the movies from database
    const movies = await db
      .collection("movies")
      .find({})
      .sort({ metacritic: -1 })
      .limit(8)
      .toArray();

    // console.log("MOnGO MFLIX MOVIES:: ", movies);
    // return NextResponse.json(movies);
    // return NextResponse.json({ movies });
    return new Response(JSON.stringify({ movies }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow all origins (or specify the origin)
      },
    });
  } catch (error) {
    console.error("MONGO DB ERROR: ", error.message, error.stack);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
};
