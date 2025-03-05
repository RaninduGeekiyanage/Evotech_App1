"use client";

import Image from "next/image";
import { useState } from "react";

export default function MoviePoster({ posterUrl, title }) {
  const [hasError, setHasError] = useState(false); // Track if an error occurred

  if (!posterUrl) {
    return (
      <div className="flex items-center justify-center bg-gray-200 text-gray-700 px-">
        No Image Available
      </div>
    );
  }

  return (
    <Image
      src={posterUrl}
      alt={title || "Movie Poster"}
      width={150}
      height={300}
      className="max-w-[200px] max-h-[400px] w-auto h-auto object-contain"
      onError={() => setHasError(true)} // Set error state if loading fails
      priority={true}
    />
  );
}
