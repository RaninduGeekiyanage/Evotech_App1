"use client"; // Enable client-side rendering for pagination

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaStar } from "react-icons/fa";
import MoviePoster from "./MoviePoster";
import { Button } from "@/components/ui/button";

const Pagination = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 8;

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Get the movies for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle next and previous
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Scrollable movie grid */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-48 px-10 md:px-36">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <div key={movie._id} className="h-[500px]">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>
                      {movie?.title}
                      <span className="text-sm text-neutral-400 font-normal"> - {movie?.year ?? "N/A"}</span>
                    </CardTitle>
                    <CardDescription className="sr-only">{movie?.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center bg-black w-full h-[260px] mb-4 rounded">
                      <MoviePoster posterUrl={movie?.poster} title={movie?.title} />
                    </div>
                    <div className="flex flex-col justify-between h-[125px]">
                      {/* movie plot */}
                      <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                      {/* movie genre */}
                      <div className="text-blue-700 text-sm font-semibold">{movie?.genres.length && movie?.genres?.join(" / ")}</div>
                      <div className="text-gray-500 text-xs font-semibold">({movie?.languages && movie?.languages?.join(" / ")})</div>
                      <div className="flex flex-row justify-between items-center">
                        <Badge variant="success" className="font-medium">
                          Rated: {movie?.rated ?? "N/A"}
                        </Badge>
                        <div className="flex flex-row gap-1 items-center" title="IMDB Rating">
                          <FaStar className="text-yellow-500 text-2x" />
                          <span className="text-sm font-semibold">{movie?.imdb?.rating ?? 0}/10</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </div>
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>

      {/* Fixed footer with pagination buttons */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center px-4 py-2 bg-white shadow-md">
        <Button onClick={prevPage} disabled={currentPage === 1} variant="outline" className="mr-4">
          Previous
        </Button>
        <span className="text-sm font-semibold">Page {currentPage} of {totalPages}</span>
        <Button onClick={nextPage} disabled={currentPage === totalPages} variant="outline" className="ml-4">
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
