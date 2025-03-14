import { MultiSelect } from "@/components/multi-select";
import showToast from "@/components/showToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { uploadToBlob } from "@/lib/actions/blob-upload-action";
import { updateMovie } from "@/lib/actions/update-movie-action";
import { GENRES, LANGUAGES, RATINGS } from "@/lib/constants";
import { movieSchema } from "@/lib/validation/movieSchema";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter


export default function EditMovieForm({ movie, open, onCancel }) {
  const [title, setTitle] = useState(movie?.title);
  const [year, setYear] = useState(movie?.year);
  const [plot, setPlot] = useState(movie?.plot);
  const [rated, setRated] = useState(movie?.rated);
  const [genres, setGenres] = useState(movie?.genres);
  const [languages, setLanguages] = useState(movie?.languages);
  const [imdbRating, setImdbRating] = useState(movie?.imdb.rating);
  const [poster, setPoster] = useState(movie?.poster);
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [isLoading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter



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
        setImdbRating(inputValue ? parseFloat(inputValue) : "");
      }
    }
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();

    setErrors({}); // Reset previous errors

    const formData = new FormData(event.currentTarget);
    const movieData = {
      title: formData.get("title")?.toString() || "",
      year: parseInt(formData.get("year")) || null,
      plot: formData.get("plot")?.toString() || "",
      imdb: { rating: parseFloat(imdbRating) || 0 },
      genres,
      languages,
      rated,
      // poster: uploadedUrl || "",
      poster,
      addedAt: new Date(),
    };

    // Validate the form data using Zod
    const validationResult = movieSchema.safeParse(movieData);
    if (!validationResult.success) {
      const fieldErrors = {};
      // console.log(validationResult.error.errors);
      validationResult.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message; // Map errors to fields
      });
      setErrors(fieldErrors);
      showToast(validationResult.error.errors[0].message, "error");
      return;
    }

    setLoading(true);

    // Only upload if a new file is selected
    if (file) {
      const response = await uploadToBlob(file);
      if (response.success) {
        setUploadedUrl(response.url);
        movieData.poster = response.url;
      } else {
        showToast(response.message, "error");
        setLoading(false);
        return; // Stop execution if upload fails
      }
    }

    // now update the movie
    const movieResponse = await updateMovie(movie.id, movieData);
    
    if (movieResponse.success) {
      showToast(movieResponse.message, "success");      
      onCancel(); // Close the modal after updating
      router.refresh(); // Refresh the table data (this can refresh the parent table data)
      
    } else {
      showToast(movieResponse.message, "error");
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
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="max-w-2xl  dark:bg-neutral-900">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>Update the Selected Movie</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Movie title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the movie title"
              />
              {errors.title && (
                <p className="text-orange-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div>
              <Label htmlFor="year">Movie Year</Label>
              <Input
                id="year"
                name="year"
                placeholder="Enter the Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              {errors.year && (
                <p className="text-orange-500 text-sm">{errors.year}</p>
              )}
            </div>
            <div>
              <Label htmlFor="plot">Movie Plot</Label>
              <Textarea
                id="plot"
                name="plot"
                placeholder="Enter the movie Plot"
                value={plot}
                onChange={(e) => setPlot(e.target.value)}
                className="h-24"
              />
              {errors.plot && (
                <p className="text-orange-500 text-sm">{errors.plot}</p>
              )}
            </div>

            <div>
              <Label htmlFor="genres">Movie Genres</Label>
              <MultiSelect
                list={genresList}
                placeholder="Select Movie genres"
                selectedItems={genres}
                onValueChange={setGenres}
              />
              {errors.genres && (
                <p className="text-orange-500 text-sm">{errors.genres}</p>
              )}
            </div>

            <div>
              <Label htmlFor="languages">Select Languages</Label>
              <MultiSelect
                list={langList}
                placeholder="Select Movie languages"
                selectedItems={languages}
                onValueChange={setLanguages}
              />
              {errors.languages && (
                <p className="text-orange-500 text-sm">{errors.languages}</p>
              )}
            </div>

            <div className="flex flex-row md:justify-between gap-4">
              <div className="flex-1 flex-col">
                <p className="text-xs">Exsiting Poster</p>
                <Image
                  src={poster}
                  width={120}
                  height={150}
                  style={{ width: "auto", height: "auto" }}
                  className="height: auto border-3 border-gray-900 shadow-lg"
                  alt="saved image"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col gap-4">
                  <div className="flex-1">
                    <Label htmlFor="rated">Content Rating</Label>
                    <Select
                      value={rated}
                      onValueChange={(val) => setRated(val)}
                    >
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
                    {errors.rated && (
                      <p className="text-orange-500 text-sm">{errors.rated}</p>
                    )}
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
                    {errors.imdb && (
                      <p className="text-orange-500 text-sm">{errors.imdb}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Upload Movie Poster</Label>
              <Input name="file" type="file" onChange={handleFileChanged} />
              {errors.poster && (
                <p className="text-orange-500 text-sm">{errors.poster}</p>
              )}
            </div>
            <div className="w-full flex justify-end space-x-5 mt-5">
              {/* <Button type="reset" variant="outline" onClick={resetForm}>
                Clear form
              </Button> */}
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <Loader className="animate-spin text-orange-300" />
                )}
                Update
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
