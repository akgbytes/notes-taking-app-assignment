import CreateNoteDialog from "@/components/create-note-dialog";
import Navbar from "@/components/navbar";
import NoteCard from "@/components/note-card";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import type { Note } from "@/types/note";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/constants";

const Dashboard = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { data } = authClient.useSession();

  const fetchAllNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}`, {
        withCredentials: true,
      });
      setNotes(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 px-2 md:px-4 mt-8">
          <div>
            <h1 className="text-4xl eb_garamond font-semibold text-gray-800">
              Welcome back, {data?.user?.name || "User"}
            </h1>
            <p className="text-base text-gray-500 mt-1 ml-2">
              Manage your notes below
            </p>
          </div>

          <CreateNoteDialog onSuccess={fetchAllNotes}>
            <Button className="cursor-pointer">
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </CreateNoteDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {notes?.map((data) => (
            <NoteCard
              content={data.content}
              id={data.id}
              title={data.title}
              updatedAt={data.updatedAt as unknown as string}
              key={data.id}
              onSuccess={fetchAllNotes}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
