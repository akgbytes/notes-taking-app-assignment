import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "@/lib/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());

import healthRoute from "@/routes/health.route";
import notesRoute from "@/routes/notes.route";
import { errorHandler } from "@/middlewares/error.middleware";

app.use("/api/v1/health", healthRoute);
app.use("/api/v1/notes", notesRoute);
app.use(errorHandler);

export default app;
