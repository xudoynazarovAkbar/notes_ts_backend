import express, {NextFunction} from "express";
import {Request, Response} from "express";
import {notesRouter} from "@notes/notes.routes";
import {errorHandler} from '@middlewares';
import {NotFoundError} from "@errors";

const app = express();

app.use(express.json());

app.use("/api/notes", notesRouter);

app.use((_req: Request, _res: Response, next: NextFunction) => {
	next(new NotFoundError("Route not found"));
});

app.use(errorHandler);

export default app;
