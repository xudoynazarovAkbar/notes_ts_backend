"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesController = void 0;
const notes_service_1 = require("@notes/notes.service");
class NotesController {
    async getAll(req, res, next) {
        try {
            const result = await notes_service_1.notesService.getAll(req.query);
            res.status(200).json({ ok: true, ...result });
        }
        catch (e) {
            next(e);
        }
    }
    async getOne(req, res, next) {
        try {
            const result = await notes_service_1.notesService.getOne(req.params.id);
            res.status(200).json({ ok: true, data: result });
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            res.status(201).json({ ok: true, data: await notes_service_1.notesService.create(req.body) });
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            res.status(200).json({ ok: true, data: await notes_service_1.notesService.delete(req.params.id) });
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            res.status(200).json({ ok: true, data: await notes_service_1.notesService.update(req.params.id, req.body) });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.notesController = new NotesController();
