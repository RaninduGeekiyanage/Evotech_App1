import React from "react";
import { getMovies } from "../libs/apis/server";

export default async function DashboardPage() {
  //read the movies array response from end pont -> server action file to front end
  const { movies } = await getMovies();

  // console.log("MOVIES::", movies);
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
          {movies?.length &&
            movies.map((movie) => (
              <div key={movie.id} className="h-96 bg-yellow-300">
                {movie?.title}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
