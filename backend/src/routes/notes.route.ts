import { Router } from "express";
import {
  createNote,
  getNote,
  getAllNotes,
  updateNote,
  deleteNote,
} from "@/controllers/notes.controller";

const router = Router();

router.post("/", createNote);
router.get("/", getAllNotes);
router.get("/:id", getNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
