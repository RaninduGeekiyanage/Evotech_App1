import React from "react";
import { getMovies } from "../libs/apis/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import MoviePoster from "./MoviePoster";

export default async function DashboardPage() {
  const response = await getMovies();
  const moviesQuery = response?.movies || []; // Ensure movies is an array

  console.log("MOVIES LIST::", moviesQuery);

  return (
    <main>
      {/* Navigation Bar */}
      <nav className="bg-blue-300 w-full h-16 flex justify-start items-center">
        <div className="container">
          <h1 className="text-black font-bold text-xl">Mflix Dashboard</h1>
        </div>
      </nav>

      {/* body section */}
      <div className="container mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* map the movie array to div as movie single element */}
          {moviesQuery.length > 0 ? (
            moviesQuery.map((movie) => (
              <div key={movie._id} className="h-96">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{movie?.title}</CardTitle>
                    <CardDescription className="sr-only">
                      {movie?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[276px] mb-4 rounded">
                      <MoviePoster
                        posterUrl={movie?.poster}
                        title={movie?.title}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p>Card Footer</p>
                  </CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>
    </main>
  );
}
