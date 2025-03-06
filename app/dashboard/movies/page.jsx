import React, { lazy, Suspense } from "react";
import { Eye, Loader} from "lucide-react"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MovieData from "./movie-data";


// const MovieForm = lazy(() => import("./oldMovie-Form"));

export const MoviesPage = () => {
 
  return (
    <div className="space-y-2 mt-2">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-lg">Movies</h1>
        <div className="flex justify-end">
          <Link href="/public-movies">
            <Button variant="outline" className="border-2 border-slate-600 dark:hover:bg-slate-700">
              <Eye />
              View As User
            </Button>
          </Link>
        </div>
      </div>

      <Card className="dark:bg-zinc-900">
        <CardHeader>
          <CardTitle className="m-0 p-0 text-slate-500 dark:text-slate-400">View and Manage all movies</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>          
          {/* <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500"/>}> */}
          <Suspense fallback={<Loader className="animate-spin duration-1000 text-green-500 text-3xl text-center"/>}>
        <MovieData />
        </Suspense>
        </CardContent>
      </Card>      
    </div>
  );
};

export default MoviesPage;