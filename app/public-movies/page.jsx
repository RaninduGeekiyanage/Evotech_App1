import { lazy, Suspense } from "react";
import { Loader } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const MovieForm = lazy(() => import("./Movie-Form"));

export const MoviesPublicPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen  dark:bg-neutral-900 dark:bg-[url('/dark.jpg')] dark:bg-cover dark:bg-center relative">
      {/* Background overlay */}
      <div className="absolute inset-0 dark:bg-black opacity-30 z-10"></div>
      <div className="relative z-20">
      {/* Show a progress bar while MovieForm is loading */}
      <Suspense
        fallback={
          <div>
            <Loader className="animate-spin  text-green-500" />
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
