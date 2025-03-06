"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState } from "react";
import EditMovieForm from "./edit-movie-form";
import DeleteMovieDialog from "./delete-movie-form";
import Image from "next/image";
import { SkipBack, SkipForward } from "lucide-react";

export default function MovieTable({ movies }) {
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;

  // Filter movies by title (case insensitive)
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages based on filtered results
  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  // Get the movies for the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Handle next and previous
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleEdit = (movie) => setEditingMovie(movie);
  const handleDelete = (movie) => setDeletingMovie(movie);

  // Function to handle delete confirmation
  const handleConfirmDelete = (movieId) => {
    console.log("Confirmed delete for movie ID:", movieId);
    setDeletingMovie(null);
  };

  return (
    <div>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1); // Reset to page 1 when searching
        }}
        className="p-2 border rounded mb-4 w-full text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:ring-opacity-30"
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Cover</TableHead>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Year</TableHead>
            <TableHead className="font-bold">Rated</TableHead>
            <TableHead className="font-bold">IMDB</TableHead>
            <TableHead className="font-bold">Languages</TableHead>
            <TableHead className="font-bold">Genres</TableHead>
            <TableHead className="text-end font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMovies.length > 0 ? (
            currentMovies.map((movie, index) => (
              <TableRow key={movie.id} className="text-slate-700 dark:text-slate-400">
                <TableCell>{indexOfFirstMovie + index + 1}</TableCell>
                <TableCell>
                  <Image
                    src={movie?.poster}
                    alt="Poster"
                    width={50}
                    height={50}
                    style={{ width: "auto", height: "auto", maxWidth:"55px" }}
                  />
                </TableCell>
                <TableCell>{movie?.title ?? "N/A"}</TableCell>
                <TableCell>{movie?.year ?? "N/A"}</TableCell>
                <TableCell>{movie?.rated ?? "N/A"}</TableCell>
                <TableCell>{movie?.imdb?.rating ?? "N/A"}</TableCell>
                <TableCell>{movie?.languages?.join(", ") ?? "N/A"}</TableCell>
                <TableCell>{movie?.genres?.join(", ") ?? "N/A"}</TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      className="text-xs border-2 border-yellow-300 dark:hover:bg-yellow-500 dark:hover:text-slate-800"
                      onClick={() => handleEdit(movie)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="text-xs border-2 border-orange-500 dark:hover:bg-orange-500 dark:hover:text-slate-800"
                      onClick={() => handleDelete(movie)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="9" className="text-center p-4">
                No movies found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {editingMovie && (
        <EditMovieForm movie={editingMovie} open={true} onCancel={() => setEditingMovie(null)} />
      )}

      {deletingMovie && (
        <DeleteMovieDialog
          movie={deletingMovie}
          open={true}
          onCancel={() => setDeletingMovie(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center px-4 py-2 shadow-md">
        <Button onClick={prevPage} disabled={currentPage === 1} variant="outline" className="mr-4 border-2 hover:bg-slate-400 dark:hover:bg-orange-500">
          <SkipBack />
        </Button>
        <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          variant="outline"
          className="ml-4 hover:bg-slate-400 dark:hover:bg-orange-500"
        >
          <SkipForward />
        </Button>
      </div>
    </div>
  );
}
