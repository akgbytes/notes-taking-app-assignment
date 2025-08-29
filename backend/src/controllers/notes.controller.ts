import { prisma } from "@/config/db";
import { ApiError } from "@/utils/ApiError";
import { ApiResponse } from "@/utils/ApiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import * as z from "zod";

const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const updateNoteSchema = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

export const createNote = asyncHandler(async (req, res) => {
  const user = req.user;

  const { success, data, error } = createNoteSchema.safeParse(req.body);
  if (!success) throw new ApiError(400, "Invalid Input", z.treeifyError(error));

  const newNote = await prisma.note.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Note created successfully", newNote));
});

export const getNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const noteId = req.params.id;

  const note = await prisma.note.findFirst({
    where: { id: noteId, userId: user.id },
  });

  if (!note) throw new ApiError(404, "Note not found");

  res.status(200).json(new ApiResponse(200, "Note fetched successfully", note));
});

export const getAllNotes = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log("user from db: ", user);

  const notes = await prisma.note.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Notes fetched successfully", notes));
});

export const updateNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const noteId = req.params.id;

  const { success, data, error } = updateNoteSchema.safeParse(req.body);
  if (!success) throw new ApiError(400, "Invalid input", z.treeifyError(error));

  const note = await prisma.note.findFirst({
    where: { id: noteId, userId: user.id },
  });
  if (!note) throw new ApiError(404, "Note not found");

  const updatedNote = await prisma.note.update({
    where: { id: noteId },
    data,
  });

  res
    .status(200)
    .json(new ApiResponse(200, "Note updated successfully", updatedNote));
});

export const deleteNote = asyncHandler(async (req, res) => {
  const user = req.user;
  const noteId = req.params.id;

  const note = await prisma.note.findFirst({
    where: { id: noteId, userId: user.id },
  });
  if (!note) throw new ApiError(404, "Note not found");

  await prisma.note.delete({ where: { id: noteId } });

  res.status(200).json(new ApiResponse(200, "Note deleted successfully", null));
});
