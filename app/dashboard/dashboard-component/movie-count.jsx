// No 'use client' needed here
import { movieCount } from "@/lib/actions/dashboard/movie-count";

const MovieCount = async () => {
  let mCount = 0;
  let error = null;

  try {
    const response = await movieCount(); // Fetch data directly on the server
    if (response.success) {
      mCount = response.count || 0; // Set the movie count if successful
    } else {
      throw new Error(response.error || "Failed to fetch movie count");
    }
  } catch (err) {
    error = err.message || "An unexpected error occurred";
  }

  return (
    <div>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex justify-end">
          <p className="text-3xl text-green-800 dark:text-green-500 font-bold border-2 border-orange-500 rounded-full w-14 h-14 flex items-center justify-center">
            {mCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieCount;
