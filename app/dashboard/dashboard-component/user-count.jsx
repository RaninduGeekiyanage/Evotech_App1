// No 'use client' needed here

import { userCount } from "@/lib/actions/dashboard/user-count";

const UserCount = async () => {
  let uCount = 0;
  let error = null;

  try {
    const response = await userCount(); // Fetch data directly on the server
    if (response.success) {
      uCount = response.count || 0; // Set the movie count if successful
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
            {uCount}
          </p>
        </div>
      )}
    </div>
  );
};

export default UserCount;
