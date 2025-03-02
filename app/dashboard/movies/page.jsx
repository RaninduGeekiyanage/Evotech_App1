import React, { lazy, Suspense } from "react";
import { Eye, Loader} from "lucide-react"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MovieData from "./movie-data";
import WaveLoader from "@/components/WaveLoader";

// const MovieForm = lazy(() => import("./oldMovie-Form"));

export const MoviesPage = async () => {
 
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg">Movies</h1>
        <div className="flex justify-end">
          <Link href="/public-movies">
            <Button variant="outline">
              <Eye />
              View As User
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Movies Managment</CardTitle>
          <CardDescription>View and Manage all movies</CardDescription>
        </CardHeader>
        <CardContent>          
          {/* <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500"/>}> */}
          <Suspense fallback={<WaveLoader className="animate-spin duration-1000 text-green-500"/>}>
        <MovieData />
        </Suspense>
        </CardContent>
      </Card>      
    </div>
  );
};

export default MoviesPage;