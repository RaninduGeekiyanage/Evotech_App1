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
// import Image from "next/image";
import MoviePoster from "./MoviePoster";
import { getMovies } from "@/lib/apis/server";

export default async function DashboardPage() {
  const response = await getMovies();
  const moviesQuery = response?.movies || []; // Ensure movies is an array

  console.log("MOVIES LIST::", moviesQuery);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {/* map the movie array to div as movie single element */}
        {moviesQuery.length > 0 ? (
          moviesQuery.map((movie) => (
            <div key={movie._id} className="h-[480px]">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>
                    {movie?.title}
                    <span className="text-sm text-neutral-400 font-normal">
                      - {movie?.year ?? "N/A"}
                    </span>
                  </CardTitle>
                  <CardDescription className="sr-only">
                    {movie?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center bg-black w-full h-[260px] mb-4 rounded">
                    <MoviePoster
                      posterUrl={movie?.poster}
                      title={movie?.title}
                    />
                  </div>
                  <div className="flex flex-col justify-between h-[125px]">
                    {/* movie plot */}
                    <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                    {/* movie genere */}
                    <div className="text-blue-700 text-sm font-semibold">
                      {movie?.genres.length && movie?.genres?.join(" / ")}
                    </div>
                    <div className="text-gray-500 text-xs font-semibold">
                      (
                      {movie?.languages.length && movie?.languages?.join(" / ")}
                      )
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
  );
}
// export default DashboardForm;
