import clientPromise from "@/app/libs/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const client = await clientPromise();
    // sample_restaurants is the db name
    const db = client.db("sample_restaurants");
    //fetch data from database
    const restaurants = await db
      .collection("restaurants")
      .find({})
      .sort({ metacritic: -1 })
      .limit(5)
      .toArray();
    // console.log("MONGO RESTAURANTS::", restaurants);

    // retun the response to server function
    return NextResponse.json({ restaurants });
  } catch (error) {
    console.log("MONGO DB ERROR: ", error);
  }
};
