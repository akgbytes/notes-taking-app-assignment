import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UpdateNoteDialog from "./update-note-dialog";
import DeleteNoteDialog from "./delete-note-dialog";
import { useNavigate } from "react-router";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  onSuccess: () => void;
}

const NoteCard = ({
  id,
  title,
  content,
  updatedAt,
  onSuccess,
}: NoteCardProps) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Card className="flex flex-col justify-between">
        <div>
          <CardHeader>
            <CardTitle className="truncate">{title}</CardTitle>
            <p className="text-xs text-gray-500">
              {new Date(updatedAt).toLocaleString()}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
          </CardContent>
        </div>

        <div className="flex items-center justify-between p-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowUpdate(true)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setShowDelete(true)}
            >
              Delete
            </Button>
          </div>

          <div>
            <Button onClick={() => navigate(`/note/${id}`)}>View Note</Button>
          </div>
        </div>
      </Card>

      {/* Update Dialog */}
      <UpdateNoteDialog
        open={showUpdate}
        setOpen={setShowUpdate}
        note={{ id, title, content }}
        onSuccess={onSuccess}
      />

      {/* Delete Dialog */}
      <DeleteNoteDialog
        open={showDelete}
        setOpen={setShowDelete}
        noteId={id}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default NoteCard;
