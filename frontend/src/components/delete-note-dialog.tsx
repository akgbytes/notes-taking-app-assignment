import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { BASE_URL } from "@/constants";

interface DeleteNoteDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  noteId: string;
  onSuccess: () => void;
}

export default function DeleteNoteDialog({
  open,
  setOpen,
  noteId,
  onSuccess,
}: DeleteNoteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${BASE_URL}/${noteId}`, { withCredentials: true });
      onSuccess();
      setOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
        </DialogHeader>
        <p>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin w-4 h-4" />
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
