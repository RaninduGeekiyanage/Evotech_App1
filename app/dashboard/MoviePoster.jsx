"use client";

import Image from "next/image";
import { useState } from "react";

export default function MoviePoster({ posterUrl, title }) {
  const [hasError, setHasError] = useState(false); // Track if an error occurred

  if (hasError) {
    return (
      <div className="flex items-center justify-center bg-gray-200 text-gray-700 px-5">
        No image available
      </div>
    );
  }

  return (
    <Image
      src={posterUrl}
      alt={title || "Movie Poster"}
      width={200}
      height={400}
      className="h-full w-auto object-contain"
      onError={() => setHasError(true)} // Set error state if loading fails
    />
  );
}
