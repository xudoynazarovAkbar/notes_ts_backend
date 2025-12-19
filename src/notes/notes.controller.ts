import NotesService from "./notes.service";
import {Request, Response, NextFunction} from "express";

class NotesController {
	async getAll(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await NotesService.getAll(req.query)
			res.status(200).json({ok: true, ...result});
		} catch (e) {
			next(e);
		}
	}
	
	async getOne(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await NotesService.getOne(req.params.id)
			res.status(200).json({ok: true, data: result});
		} catch (e) {
			next(e);
		}
	}
	
	async create(req:Request, res:Response, next:NextFunction) {
		try {
			res.status(201).json({ok: true, data: await NotesService.create(req.body)});
		} catch (e) {
			next(e);
		}
	}
	
	async delete(req:Request, res:Response, next:NextFunction) {
		try {
			res.status(200).json({ok: true, data: await NotesService.delete(req.params.id)});
		} catch (e) {
			next(e)
		}
	}
	
	async update(req:Request, res:Response, next:NextFunction) {
		try {
			res.status(200).json({ok: true, data: await NotesService.update(req.params.id, req.body)});
		} catch (e) {
			next(e);
		}
	}
}

export default new NotesController();
