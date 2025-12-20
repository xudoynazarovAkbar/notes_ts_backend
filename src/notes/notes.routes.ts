import {Router} from "express";
import {notesController} from "@notes/notes.controller";

export const router = Router();

router.get("/", notesController.getAll);
router.get("/:id", notesController.getOne);
router.post("/", notesController.create);
router.delete("/:id", notesController.delete);
router.patch("/:id", notesController.update);