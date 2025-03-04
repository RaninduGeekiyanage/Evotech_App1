import showToast from "@/components/showToast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteMovie } from "@/lib/actions/delete-movie-action";
import { useRouter } from "next/navigation";

export default function DeleteMovieDialog({
  open,
  movie,
  onCancel,
  isLoading,
}) {
     const router = useRouter(); // Initialize useRouter


  const handleDelete = async (event) => {
    event.preventDefault();

    const deleteResponse = await deleteMovie(movie.id);

    if (deleteResponse.success) {
      showToast(deleteResponse.message, "success");
      onCancel(); // Close the modal after updating
      router.refresh(); // Refresh the table data (this can refresh the parent table data)
    } else {
      showToast(deleteResponse.message, "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Movie</DialogTitle>
          <DialogDescription>
            Are you sure, you want to delete the movie&nbsp;{" "}
            <span className="text-red-700 font-bold">"{movie.title}"</span>
            &nbsp;? This action can't be undone...!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="space-x-2">
          <Button variant="outline" disabled={isLoading} onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
