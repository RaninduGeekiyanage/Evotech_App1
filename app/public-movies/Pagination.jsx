"use client"; // Enable client-side rendering for pagination

import { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { SkipBack, SkipForward } from "lucide-react";

const Pagination = ({ movies }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [selectedGenre, setSelectedGenre] = useState(""); // Genre state
  const [selectedLang, setSelectedLang] = useState(""); // Language select
  const [selectedRate, setSelectedRate] = useState(0); // rate state
  const moviesPerPage = 8;

  // Extract unique genres
  const uniqueGenres = [
    "All Genres",
    ...new Set(movies.flatMap((movie) => movie.genres)),
  ].sort();

  const uniqueLang = [
    "All Languages",
    ...new Set(movies.flatMap((movie) => movie.languages)),
  ].sort();

  // Filter movies by search and genre and rating
  const filteredMovies = movies.filter((movie) => {
    const matchesGenre =
      selectedGenre && selectedGenre !== "All Genres"
        ? movie.genres.includes(selectedGenre)
        : true;

    const matchesRate = movie.imdb?.rating
      ? movie.imdb.rating >= selectedRate
      : false;

    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesLang =
      selectedLang && selectedLang !== "All Languages"
        ? movie.languages.includes(selectedLang)
        : true;

    return matchesGenre && matchesRate && matchesSearch && matchesLang;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="relative flex flex-col h-screen">
      {/* Search & Genre Filter */}
      <div className="flex flex-col gap-2 mx-14 md:flex-row md:mx-40 mb-4 justify-between">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset pagination when searching
          }}
          className="p-2 border rounded text-sm md:w-1/2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-opacity-30 h-10"
        />

        {/* Genre Filter */}
        <select
          className="p-2 border rounded text-sm md:w-2/6 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-opacity-30 h-10"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setCurrentPage(1); // Reset pagination when filtering
          }}
        >
          <option value="" disabled hidden>
            Select Genre
          </option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        {/* Rating Filter */}
        <select
          className="p-2 border rounded text-sm md:w-16 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-opacity-30"
          value={selectedRate}
          onChange={(e) => {
            setSelectedRate(e.target.value);
            setCurrentPage(1); // Reset pagination when filtering
          }}
        >
          {[...Array(11).keys()].map((rate) => (
            <option key={rate} value={rate}>
              {rate}
            </option>
          ))}
        </select>

        {/* Language Filter */}
        <select
          className="p-2 border rounded text-sm md:w-48 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-opacity-30 md:mr-4"
          value={selectedLang}
          onChange={(e) => {
            setSelectedLang(e.target.value);
            setCurrentPage(1); // Reset pagination when filtering
          }}
        >
          {uniqueLang.map((languages) => (
            <option key={languages} value={languages}>
              {languages}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-48 px-10 md:px-36">
          {currentMovies.length > 0 ? (
            currentMovies.map((movie) => (
              <div key={movie._id} className="h-[450px]">
                <Card className="h-full dark:bg-zinc-900">
                  <CardHeader>
                    <CardTitle className="h-8 items-center text-center">
                      {movie?.title} <br />
                      <span className="text-sm text-neutral-400 font-normal">
                        {movie?.year ?? "N/A"}
                      </span>
                    </CardTitle>
                    <CardDescription className="sr-only">
                      {movie?.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex w-full justify-center items-center">
                      <div className="flex justify-center h-[220px] mb-4 rounded border-2 p-2">
                        <MoviePoster
                          posterUrl={movie?.poster}
                          title={movie?.title}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-between h-[125px]">
                      <p className="line-clamp-2 text-xs">{movie?.plot}</p>
                      <div className="text-blue-700 text-sm font-semibold">
                        {movie?.genres.length && movie?.genres?.join(" / ")}
                      </div>
                      <div className="text-gray-500 text-xs font-semibold">
                        ({movie?.languages && movie?.languages?.join(" / ")})
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
            ))
          ) : (
            <p>No movies available</p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center bg-gray-100 dark:bg-zinc-900 px-4 py-2 shadow-md">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
          className="mr-4 hover:bg-slate-400 dark:hover:bg-orange-500"
        >
          <SkipBack />
        </Button>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="ml-4 hover:bg-slate-400 dark:hover:bg-orange-500"
        >
          <SkipForward />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
