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
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { createMovie } from "@/lib/actions/add-movie";
import { uploadToBlob } from "@/lib/actions/blob-upload-action";
import { Button } from "@/components/ui/button";
import showToast from "@/components/showToast";

export default function AddMovieForm() {
  const [genres, setGenres] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [rated, setRated] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imdbRating, setImdbRating] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

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
    if (/^\d*\.?\d*$/.test(inputValue)) {
      const numericValue = parseFloat(inputValue);
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
    const imdbRating = formData.get("imdbRating")?.toString() || "";

    // Validate and parse imdbRating
    const imdbRatingValue = parseFloat(imdbRating);
    const imdb = !isNaN(imdbRating) ? { imdb: { rating: imdbRating } } : null;

    // console.log("file");

    if (!title || !year || !plot || !rated || !file) {
      showToast("Fill all required fields!", "warning");
      return;
    }

    setLoading(true);

    const response = await uploadToBlob(file);

    if (response.success) {
      const uploadedUrl = response.url;
      setUploadedUrl(uploadedUrl);

      const movieResponse = await createMovie({
        title,
        year,
        plot,
        rated,
        genres,
        languages,
        imdb: { rating: imdbRatingValue },
        poster: uploadedUrl,
        addedAt: new Date(),
      });

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
                  step="0.1"
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
              <Label>Upload Movie Poster</Label>
              <Input name="file" type="file" onChange={handleFileChanged} />
            </div>
          </CardContent>

          <CardFooter className="w-full flex justify-end space-x-5 mt-5">
            <Button type="reset" variant="outline">
              Clear form
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="animate-spin" />}
              Add Movie
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
