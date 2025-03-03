import { db } from "@/lib/mongodb";
// import { NextResponse } from "next/server";

export const GET = async () => {
  //Get movies from nongo db

  try {
 

    if (!client) {
      console.error("MongoClient not initialized");
      throw new Error("MongoClient not initialized");
    }

  

    //fetch the movies from database
    const movies = await db
      .collection("movies-n")
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
