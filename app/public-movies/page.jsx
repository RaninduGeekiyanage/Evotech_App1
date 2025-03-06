import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const MovieForm = lazy(() => import("./Movie-Form"));

export const MoviesPublicPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen  dark:bg-neutral-900 bg-[url('/dark.jpg')] bg-cover bg-center relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
      <div className="relative z-20">
      {/* Show a progress bar while MovieForm is loading */}
      <Suspense
        fallback={
          <div>
            <Loader className="animate-spin text-3xl  text-green-500" />
          </div>
        }
      >
        <div className="flex flex-col">
          <div className="flex justify-end">
            <ThemeToggle/>
          </div>
          <div>
            <MovieForm />
          </div>
        </div>
      </Suspense>
      </div>
    </div>
  );
};

export default MoviesPublicPage;
