import React, { lazy, Suspense } from "react";
import { Loader } from "lucide-react"; 

const MovieForm = lazy(() => import("./Movie-Form"));

export const MoviesPage = () => {
  return (
    <div>
      {/* Show a progress bar while MovieForm is loading */}
      <Suspense fallback={<div><Loader className="animate-spin" /></div>}>
      <MovieForm />
      </Suspense>
    </div>
  );
};

export default MoviesPage;