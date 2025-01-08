"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import MoviePoster from "./MoviePoster";
import { getMovies } from "@/app/libs/apis/server";

export default function DashboardPage() {
  const [movies, setMovies] = useState([]); // State to store movies data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovies(); // Fetch movies from server
        if (response?.error) {
          setError(response.message || "Failed to load movies.");
        } else {
          setMovies(response.movies || []); // Update movies state
        }
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMovies(); // Call the fetch function
  }, []); // Dependency array ensures it runs once on component mount

  return (
    <main>
      {/* Navigation Bar */}
      <nav className="bg-gray-800 w-full h-25 flex justify-start items-center">
        <div className="container">
          <h1 className="font-bold text-4xl text-center text-gray-200 mt-2">
            Download Mflix movies: High quality
          </h1>
          <p className="text-center my-3 text-gray-300">
            Welcome to the official YTS.MX website. Here you can browse and{" "}
            <br />
            download YIFY movies in excellent 720p, 1080p, 2160p 4K, and 3D
            quality.
          </p>
        </div>
      </nav>

      {/* Body Section */}
      <div className="container mt-8">
        {/* Display loading, error, or movie list */}
        {loading ? (
          <p>Loading movies...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {movies.map((movie) => (
              <div key={movie._id} className="h-[480px]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {movie?.title}
                      <span className="text-sm text-neutral-400 font-normal">
                        - {movie?.year ?? "N/A"}
                      </span>
                    </CardTitle>
                    <CardDescription className="sr-only">
                      {movie?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[260px] mb-4 rounded">
                      <MoviePoster
                        posterUrl={movie?.poster}
                        title={movie?.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between h-[125px]">
                      <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                      <div className="text-blue-700 text-sm font-semibold">
                        {movie?.genres.length && movie?.genres?.join(" / ")}
                      </div>
                      <div className="text-gray-500 text-xs font-semibold">
                        (
                        {movie?.languages.length &&
                          movie?.languages?.join(" / ")}
                        )
                      </div>
                      <div className="flex flex-row justify-between items-center">
                        <Badge variant="success" className="font-medium">
                          Rated: {movie?.rated ?? "N/A"}
                        </Badge>
                        <div
                          className="flex flex-row gap-1 items-center"
                          title="IMDB Rating"
                        >
                          <FaStar className="text-yellow-500 text-2x" />
                          <span className="text-sm font-semibold">
                            {movie?.imdb?.rating ?? 0}/10
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </main>
  );
}
