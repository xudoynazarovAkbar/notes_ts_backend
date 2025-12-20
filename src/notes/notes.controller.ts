import {Request, Response, NextFunction} from "express";
import {notesService} from '@notes/notes.service'

class NotesController {
	async getAll(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await notesService.getAll(req.query)
			res.status(200).json({ok: true, ...result});
		} catch (e) {
			next(e);
		}
	}
	
	async getOne(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await notesService.getOne(req.params.id)
			res.status(200).json({ok: true, data: result});
		} catch (e) {
			next(e);
		}
	}
	
	async create(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await notesService.create(req.body)
			res.status(201).json({ok: true, data: result});
		} catch (e) {
			next(e);
		}
	}
	
	async delete(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await notesService.delete(req.params.id)
			res.status(200).json({ok: true, data: result});
		} catch (e) {
			next(e)
		}
	}
	
	async update(req:Request, res:Response, next:NextFunction) {
		try {
			const result = await notesService.update(req.params.id, req.body)
			res.status(200).json({ok: true, data: result});
		} catch (e) {
			next(e);
		}
	}
}

export const notesController = new NotesController();
