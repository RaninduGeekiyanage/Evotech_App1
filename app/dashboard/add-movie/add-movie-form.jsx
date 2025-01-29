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
import { GENRES, LANGUAGES, RATINGS } from "@/lib/constants";
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
import { toast } from "@/hooks/use-toast";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegThumbsUp } from "react-icons/fa";

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

  const handleImdbRatingValue = (e) => {
    const inputValue = e.target.value;

    // Allow only floating-point numbers
    if (/^\d*\.?\d*$/.test(inputValue)) {
      const numericValue = parseFloat(inputValue);

      // Restrict the value to be between 0 and 10
      if (numericValue >= 0 && numericValue <= 10) {
        setImdbRating(inputValue);
      }
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title")?.toString() || "";
    const year = parseInt(formData.get("year")) || null;
    const plot = formData.get("plot")?.toString() || "";
    const poster = formData.get("poster")?.toString() || "";
    const imdbRating = formData.get("imdbRating")?.toString() || "";

    // Validate and parse imdbRating
    // const imdbRatingValue = parseFloat(imdbRating);

    const imdbRatingValue = parseFloat(imdbRating);
    const imdb = !isNaN(imdbRating) ? { imdb: { rating: imdbRating } } : null;

    if (title && year && plot && rated && imdb && poster) {
      console.log({
        title,
        year,
        plot,
        rated,
        genres,
        languages,
        ...imdb,
        poster,
      });
      setLoading(true);
      await createMovie({
        title,
        year,
        plot,
        rated,
        genres,
        languages,
        ...imdb,
        poster,
      });
      setLoading(false);
      toast({
        variant: "success",
        title: (
          <div className="flex flex-row">
            Move added successfully..{" "}
            <span className="pl-2">
              <FaRegThumbsUp className="text-green-400 h-4 w-4" />
            </span>
          </div>
        )
        
      });
    } else {
      toast({
        variant: "warning",
        title: (
          <div className="flex flex-row">
           Warning..!{" "}
            <span className="pl-2">
              <IoWarningOutline className="text-orange-400 h-4 w-4" />
            </span>
          </div>
        ),
        description: "Fill all the fileds and re submit",
        
      });
    }
  }

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

            <div className="flex flex-col md:flex-row md:justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor="rated">Content Rating</Label>
                <Select onValueChange={(val) => setRated(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Content Rating" />
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

              <div className="flex-1">
                <Label htmlFor="imdbRating">IMDB Rating</Label>
                <Input
                  type="number"
                  step="0.1" // Allows decimal values
                  min="0"
                  max="10"
                  id="imdbRating"
                  name="imdbRating"
                  placeholder="Imdb Rating"
                  value={imdbRating}
                  onChange={handleImdbRatingValue}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="poster">Poster URL</Label>
              <Input id="poster" name="poster" placeholder="Enter poster URL" />
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-end space-x-5 mt-5">
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
