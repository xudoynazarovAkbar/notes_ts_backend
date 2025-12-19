import {Router} from "express";
import NotesController from "./notes.controller";

const router = Router();

router.get("/", NotesController.getAll)
router.get("/:id", NotesController.getOne)
router.post("/", NotesController.create)
router.delete("/:id", NotesController.delete);
router.patch("/:id", NotesController.update)

export default router;