"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "../../../components/multi-select";
import { GENRES, IMDBRATINGS, LANGUAGES, RATINGS } from "@/lib/constants";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createMovie } from "@/lib/actions/movie";

export default function AddMovieForm() {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imdbRating, setImdbRating] = useState("");

  const genresList = GENRES.map((genre) => ({
    label: genre,
    value: genre,
  }));

  const langList = LANGUAGES.map((lang) => ({
    label: lang,
    value: lang,
  }));

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString() || "";
    const year = parseInt(formData.get("year")) || null;
    const plot = formData.get("plot")?.toString() || "";

    // Validate and parse imdbRating
    const imdbRatingValue = parseFloat(imdbRating);
    console.log(imdbRatingValue);

    const imdb = !isNaN(imdbRatingValue)
      ? { imdb: { rating: imdbRatingValue } }
      : null;

    if (title && year && plot && rated && imdb) {
      console.log({ title, year, plot, rated, genres, languages, ...imdb });
      setLoading(true);
      await createMovie({
        title,
        year,
        plot,
        rated,
        genres,
        languages,
        ...imdb,
      });
      setLoading(false);
    }
  };

  // console.log(genresList)
  return (
    <div>
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Add movie</CardTitle>
          <CardDescription>Add a movie to the MFlix database</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmitForm}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Movie title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter the movie title"
              />
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input id="year" name="year" placeholder="Enter the Year" />
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                placeholder="Enter the movie Plot"
              />
            </div>

            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select Movie genres"
                onValueChange={setGenres}
              />
            </div>

            <div>
              <Label htmlFor="languages">Select Languages</Label>
              <MultiSelect
                list={langList}
                placeholder="Select Movie languages"
                onValueChange={setLanguages}
              />
            </div>

            <div>
              <div>
                <Label htmlFor="rated">Movie Rated</Label>
                <Select onValueChange={(val) => setRated(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a IMDB Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {RATINGS.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="imdbRating">IMDB Rating</Label>
                <Select
                  onValueChange={(val) =>  setImdbRating(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {IMDBRATINGS.map((imdbR) => (
                      <SelectItem key={imdbR} value={imdbR}>
                        {imdbR}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-end space-x-2">
            <Button type="reset" variant="outline">
              Clear form
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              add Movies
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
