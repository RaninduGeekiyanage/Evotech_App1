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
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Loader2 } from "lucide-react";
import { createMovie } from "@/lib/actions/add-movie";
import { uploadToBlob } from "@/lib/actions/blob-upload-action";
import { Button } from "@/components/ui/button";
import showToast from "@/components/showToast";
import { movieSchema } from "@/lib/validation/movieSchema";

export default function AddMovieForm() {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imdbRating, setImdbRating] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [key, setKey] = useState(0); // Key for remounting

   // Reset errors when the key changes (component remounts)
   useEffect(() => {
    setErrors({});
  }, [key]);


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

    // Allow empty value (so user can delete input)
    if (inputValue === "") {
      setImdbRating("");
      return;
    }

    // Validate only numeric input with optional decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      const numericValue = parseFloat(inputValue);
      if (numericValue >= 0 && numericValue <= 10) {
        setImdbRating(inputValue);
      }
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    // Check if the file input is empty
  if (!file) {
    showToast("Please select a movie poster.", "error");
    return;
  }



    setErrors({}) // Reset previous errors

    const formData = new FormData(event.currentTarget);
    const movieData = {
      title: formData.get("title")?.toString() || "",
      year: parseInt(formData.get("year")) || null,
      plot: formData.get("plot")?.toString() || "",
      imdb: { rating: parseFloat(imdbRating) || 0 },
      genres,
      languages,
      rated,
      poster: uploadedUrl || "",
      addedAt: new Date(),
    };

    // Validate the form data using Zod
    const validationResult = movieSchema.safeParse(movieData);
    if (!validationResult.success) {
      const fieldErrors = {};
      // console.log(validationResult.error.errors);
      validationResult.error.errors.forEach((err)=> {
        fieldErrors[err.path[0]] = err.message; // Map errors to fields
      })
      setErrors(fieldErrors);
      showToast(validationResult.error.errors[0].message, "error");
      return;
    }

    setLoading(true);
    const response = await uploadToBlob(file);

    if (response.success) {
      setUploadedUrl(response.url);
      movieData.poster = response.url;
      // setUploadedUrl(uploadedUrl)

      const movieResponse = await createMovie(movieData);

      if (movieResponse.success) {
        showToast(movieResponse.message, "success");
      } else {
        showToast(movieResponse.message, "error");
      }
    } else {
      showToast(response.message, "error");
    }

    setLoading(false);
  };

  const handleFileChanged = (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };


  const resetForm = () => {
    setKey((prevKey) => prevKey + 1); // Change the key to force remount
  };

  return (
    <div key={key}>
      <Card className="max-w-2xl mx-auto dark:bg-neutral-900">
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
              {errors.title && <p className="text-orange-500 text-sm">{errors.title}</p>}
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input id="year" name="year" placeholder="Enter the Year" />
              {errors.year && <p className="text-orange-500 text-sm">{errors.year}</p>}
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                placeholder="Enter the movie Plot"
              />
              {errors.plot && <p className="text-orange-500 text-sm">{errors.plot}</p>}
            </div>

            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select Movie genres"
                selectedItems={genres}
                onValueChange={setGenres}

              />
              {errors.genres && <p className="text-orange-500 text-sm">{errors.genres}</p>}
            </div>

            <div>
              <Label htmlFor="languages">Select Languages</Label>
              <MultiSelect
                list={langList}
                placeholder="Select Movie languages"
                selectedItems={languages}
                onValueChange={setLanguages}
              />
              {errors.languages && <p className="text-orange-500 text-sm">{errors.languages}</p>}
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
                {errors.rated && <p className="text-orange-500 text-sm">{errors.rated}</p>}
              </div>

              <div className="flex-1">
                <Label htmlFor="imdbRating">IMDB Rating</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  id="imdbRating"
                  name="imdbRating"
                  placeholder="Imdb Rating"
                  value={imdbRating}
                  onChange={handleImdbRatingValue}
                />
                {errors.imdb && <p className="text-orange-500 text-sm">{errors.imdb}</p>}
              </div>
            </div>

            <div>
              <Label>Upload Movie Poster</Label>
              <Input name="file" type="file" onChange={handleFileChanged} />
              {errors.poster && <p className="text-orange-500 text-sm">{errors.poster}</p>}
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-end space-x-5 mt-5">
            <Button type="reset" variant="outline" onClick={resetForm}>
              Clear form
            </Button>
            <Button type="submit" disabled={isLoading || !file}>
              {isLoading && <Loader className="animate-spin text-orange-300"/>}
              Add Movie
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

