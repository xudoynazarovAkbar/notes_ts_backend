import express from "express";
import {Request, Response} from "express";
import {router} from "@notes/notes.routes";
import {errorHandler} from '@middlewares';

const app = express();

app.use(express.json());

app.use("/api/notes", router);

app.use(errorHandler);

app.use((_req: Request, res: Response) => {
	res.status(404).json({ok: false, message: "Route not found"});
});

export default app;
