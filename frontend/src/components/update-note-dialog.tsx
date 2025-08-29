import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { BASE_URL } from "@/constants";

interface UpdateNoteDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  note: { id: string; title: string; content: string };
  onSuccess: () => void;
}

export default function UpdateNoteDialog({
  open,
  setOpen,
  note,
  onSuccess,
}: UpdateNoteDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { title: note.title, content: note.content },
  });

  const onSubmit = async (data: { title: string; content: string }) => {
    try {
      await axios.put(`${BASE_URL}/${note.id}`, data, {
        withCredentials: true,
      });
      onSuccess();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Update Note</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Note title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Textarea
                className="min-h-[200px] resize-y break-words whitespace-pre-wrap"
                placeholder="Write your note here..."
                {...register("content", { required: "Content is required" })}
              />
              {errors.content && (
                <p className="text-sm text-red-500">{errors.content.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin w-4 h-4" /> Saving...
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
