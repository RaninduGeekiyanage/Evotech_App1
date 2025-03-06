import { getMovies } from "@/lib/actions/get-movies-action"; // Assuming this fetches movies from API
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Pagination from "./Pagination";

export default async function MovieForm() {
  const response = await getMovies();
  const moviesQuery = response?.data || []; // Ensure movies is an array

  // Convert _id to string before passing to Pagination component
  const formattedMovies = moviesQuery.map((movie) => ({
    ...movie,
    _id: String(movie._id),
  }));

  return (
    <div className="space-y-4 my-10">
      <div className="flex flex-row justify-between items-center px-4 md:px-40">
        <h1 className=" text-gray-500 text-2xl">Browse Movies</h1>
        <div className="flex justify-end">
          <Link href="/dashboard/movies">
            <Button variant="outline" className="border-2 border-slate-600 dark:hover:bg-slate-700 mr-4">
              <LayoutDashboard />
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Pass movies to the Pagination Component */}
      <Pagination movies={formattedMovies}/>
    </div>
  );
}
