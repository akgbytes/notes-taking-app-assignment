import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { LoaderCircle } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { BASE_URL } from "@/constants";

interface CreateNoteDialogProps {
  children: React.ReactNode;
  onSuccess: () => void;
}

type NoteForm = {
  title: string;
  content: string;
};

const CreateNoteDialog = ({ children, onSuccess }: CreateNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NoteForm>();

  const [showDialog, setShowDialog] = useState(false);

  const onSubmit = async (data: NoteForm) => {
    try {
      await axios.post(BASE_URL, data, { withCredentials: true });
      toast.success("Note created successfully");
      reset();
      setShowDialog(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>
              Add a new note to your collection
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Note title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
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
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <LoaderCircle className="animate-spin w-5 h-5 text-zinc-600" />
                  Saving...
                </div>
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
