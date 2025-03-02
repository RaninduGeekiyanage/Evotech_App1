import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  year: z
    .number()
    .int()
    .min(1800, "Year must be greater than 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  plot: z.string().min(1, "Plot is required"),
  genres: z.array(z.string()).min(1, "At least one genre must be selected"),
  languages: z.array(z.string()).min(1, "At least one language must be selected"),
  rated: z.string().min(1, "Content rating is required"),
  imdb: z.object({
    rating: z
      .number()
      .min(0.1, "IMDB rating must be at least 0.1")
      .max(10, "IMDB rating cannot be more than 10"),
  }),
  poster: z.string(),
  addedAt: z.date(),
});
