"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import EditMovieForm from "./edit-movie-form";
import DeleteMovieDialog from "./delete-movie-form";
import Image from "next/image";

export default function MovieTable({ movies }) {
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 6;


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

  const handleEdit = (movie) => {
    console.log("edit", movie);
    setEditingMovie(movie);
  };

  const handleDelete = (movie) => {
    console.log("Delete", movie);
    setDeletingMovie(movie);
  };

  // Function to handle delete confirmation
  const handleConfirmDelete = (movieId) => {
    console.log("Confirmed delete for movie ID:", movieId);
    // Perform the delete operation (e.g., API call)
    setDeletingMovie(null); // Close the dialog after delete
  };

  return (
    <div>
    <div>
      <Table>
        <TableHeader >
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Cover</TableHead>
            <TableHead className="font-bold">Title</TableHead>
            <TableHead className="font-bold">Year</TableHead>
            <TableHead className="font-bold">Rated</TableHead>
            <TableHead className="font-bold">IMDB</TableHead>
            <TableHead className="font-bold">languages</TableHead>
            <TableHead className="font-bold">Genres</TableHead>
            <TableHead className="text-end font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMovies.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell><Image src={movie?.poster} alt="Poster" width={60} height={75} style={{ width: "auto", height: "auto" }}/></TableCell>
              <TableCell>{movie?.title ?? "N/A"}</TableCell>
              <TableCell>{movie?.year ?? "N/A"}</TableCell>
              <TableCell>{movie?.rated ?? "N/A"}</TableCell>
              <TableCell>{movie?.imdb.rating ?? "N/A"}</TableCell>
              <TableCell>{movie?.languages.join(", ") ?? "N/A"}</TableCell>
              <TableCell>{movie?.genres.join(", ") ?? "N/A"}</TableCell>
              <TableCell>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    className="text-xs border-2 border-yellow-400"
                    onClick={() => handleEdit(movie)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="text-xs"
                    onClick={() => handleDelete(movie)}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingMovie && (
        <EditMovieForm
          movie={editingMovie}
          open={true}
          onCancel={() => setEditingMovie(null)}
        />
      )}

      {deletingMovie && (
        <DeleteMovieDialog
          movie={deletingMovie}
          open={true}
          onCancel={() => setDeletingMovie(null)}
          onConfirm={handleConfirmDelete} // Pass function
        />
      )}
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
}
