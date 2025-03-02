import clientPromise from "@/lib/mongodb";
import MovieTable from "./movie-table";

export default async function MovieData() {
  try {
    const client = await clientPromise();
    const db = client.db("sample_mflix");

    // Fetch movies sorted by `addedAt` in descending order (latest first)
    const moviesQuary = await db
      .collection("movies-n")
      .find({})
      .sort({ addedAt: -1 })
      .toArray();

    if (moviesQuary) {
      // refine movies to an array
      const refineMovies = moviesQuary.map((movie) => ({
        id: movie._id.toString(),
        title: movie.title,
        year: movie.year,
        plot: movie.plot,
        rated: movie.rated,
        genres: movie.genres,
        languages: movie.languages,
        imdb: movie.imdb,
        poster: movie.poster,
      }));

      return <MovieTable movies={refineMovies}/>;
    }
  } catch (error) {
    // console.log(error);

    return (
      <div className="flex justify-center items-center h-[186.5px]">
        <p className="text-red-600 font-medium animate-pulse duratio">
          No movies Available...
        </p>
      </div>
    );
  }
}
