"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notesService = void 0;
const uuid_1 = require("uuid");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const _errors_1 = require("@errors");
const filePath = path_1.default.resolve("src/data/notes.json");
class NotesService {
    async _readFile() {
        const content = await promises_1.default.readFile(filePath, "utf-8");
        return JSON.parse(content);
    }
    async _writeFile(notes) {
        await promises_1.default.writeFile(filePath, JSON.stringify(notes, null, 2));
    }
    async getAll(query) {
        const notes = await this._readFile();
        const { search } = query;
        const limit = Number(query.limit);
        const page = Number(query.page);
        let filtered = notes;
        if (search) {
            const term = search.toLowerCase();
            filtered = filtered.filter((note) => note.content.toLowerCase().includes(term));
        }
        if (!Number.isNaN(limit) && !Number.isNaN(page) && limit > 0 && page > 0) {
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const hasPreviousPage = startIndex > 0;
            const hasNextPage = endIndex < filtered.length;
            filtered = filtered.slice(startIndex, endIndex);
            return {
                data: filtered,
                pagination: {
                    currentPage: page,
                    perPage: limit,
                    hasPreviousPage,
                    hasNextPage,
                },
            };
        }
        if (!Number.isNaN(limit) && limit > 0) {
            filtered = filtered.slice(0, limit);
        }
        return { data: filtered };
    }
    async getOne(id) {
        const notes = await this._readFile();
        const note = notes.find((x) => x.id === id);
        if (!note) {
            throw new _errors_1.NotFoundError("No note with id: " + id);
        }
        return note;
    }
    async create(body) {
        const content = body?.content?.trim();
        if (!content) {
            throw new _errors_1.BadRequestError("Content is required");
        }
        if (content.length > 300) {
            throw new _errors_1.BadRequestError("Content size should not be more than 300 characters");
        }
        const notes = await this._readFile();
        const note = { id: (0, uuid_1.v4)(), content: content };
        notes.push(note);
        await this._writeFile(notes);
        return note;
    }
    async delete(id) {
        const notes = await this._readFile();
        const index = notes.findIndex((note) => note.id === id);
        if (index === -1) {
            throw new _errors_1.NotFoundError("No note with id: " + id);
        }
        const [deleted] = notes.splice(index, 1);
        await this._writeFile(notes);
        return deleted;
    }
    async update(id, body) {
        const content = body?.content?.trim();
        if (!content)
            throw new _errors_1.BadRequestError("Content is required");
        if (content.length > 300)
            throw new _errors_1.BadRequestError("Content size should not be more than 300 characters");
        const notes = await this._readFile();
        const index = notes.findIndex(n => n.id === id);
        if (index === -1)
            throw new _errors_1.NotFoundError("No note with id: " + id);
        const note = notes[index];
        note.content = content;
        await this._writeFile(notes);
        return note;
    }
}
exports.notesService = new NotesService();
