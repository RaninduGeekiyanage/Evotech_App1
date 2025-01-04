import { NextResponse } from "next/server";

//create dummy array befor connect to mongo db

const MOVIES = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
  { id: 3, title: "Movie 3" },
  { id: 4, title: "Movie 4" },
  { id: 5, title: "Movie 5" },
  { id: 6, title: "Movie 6" },
  { id: 7, title: "Movie 7" },
  { id: 8, title: "Movie 8" },
  { id: 9, title: "Movie 9" },
  { id: 10, title: "Movie 10" },
];

// create dummy route
export const GET = async (req) => {
  return NextResponse.json({ success: true, movies: MOVIES });
};
