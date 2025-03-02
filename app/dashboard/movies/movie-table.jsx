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

export default function MovieTable({ movies }) {
  const [editingMovie, setEditingMovie] = useState(null);
  const [deletingMovie, setDeletingMovie] = useState(null);

  const handleEdit = (movie) => {
    console.log("edit", movie);
    setEditingMovie(movie);
  };

  const handleDelete = (movie) => {
    console.log("Delete", movie);
    setDeletingMovie(movie);
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Cover</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Year</TableHead>
            <TableHead>Rated</TableHead>
            <TableHead>IMDB</TableHead>
            <TableHead>languages</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead className="text-end">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movies.map((movie, index) => (
            <TableRow key={movie.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>Poster URL</TableCell>
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
      {editingMovie && 
      <EditMovieForm 
      movie={editingMovie}
      open={true} 
      onCancel={() => setEditingMovie(null)}
      /> }
    </div>
  );
}
