import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/constants";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const NoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/${id}`, {
          withCredentials: true,
        });
        setNote(res.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-6 h-6 text-sky-600 animate-spin" />
          <span className="text-sm text-gray-500">Loading...</span>
        </div>
      </div>
    );
  if (!note)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="">No note found</div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{note.title}</CardTitle>
          <p className="text-xs text-gray-500">
            {new Date(note.updatedAt).toLocaleString()}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NoteViewPage;
