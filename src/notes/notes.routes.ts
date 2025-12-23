import {Router} from "express";
import {notesController} from "@notes/notes.controller";

export const notesRouter = Router();

notesRouter.get("/", notesController.getAll);
notesRouter.get("/:id", notesController.getOne);
notesRouter.post("/", notesController.create);
notesRouter.delete("/:id", notesController.delete);
notesRouter.patch("/:id", notesController.update);