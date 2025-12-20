import {v4 as uuid} from "uuid";
import fs from "fs/promises";
import path from "path";
import {BadRequestError, NotFoundError} from "@errors";
import {INote, IQuery, IRequestBody, IResponseGetAll} from "@types";

const filePath = path.resolve("src/data/notes.json");
const MAX_CONTENT_LENGTH = 300;

class NotesService {
	async _readFile(): Promise<INote[]> {
		const content = await fs.readFile(filePath, "utf-8");
		return JSON.parse(content);
	}
	
	async _writeFile(notes: INote[]): Promise<void> {
		await fs.writeFile(
			filePath,
			JSON.stringify(notes, null, 2));
	}
	
	async getAll(query: IQuery): Promise<IResponseGetAll> {
		const notes = await this._readFile();
		const {search} = query;
		
		const limit = Number(query.limit);
		const page = Number(query.page);
		
		let filtered = notes;
		
		if (search) {
			const term = search.toLowerCase();
			filtered = filtered.filter((note) =>
				note.content.toLowerCase().includes(term)
			);
		}
		
		if (!Number.isNaN(limit) && !Number.isNaN(page) && limit > 0 && page > 0) {
			const startIndex = (page - 1) * limit;
			const endIndex = page * limit;
			
			const hasPreviousPage = startIndex > 0;
			const hasNextPage = endIndex < filtered.length;
			const totalItems = filtered.length;
			const totalPages = Math.ceil(filtered.length / limit);
			filtered = filtered.slice(startIndex, endIndex);
			
			return {
				data: filtered,
				pagination: {
					currentPage: page,
					perPage: limit,
					hasPreviousPage,
					hasNextPage,
					totalPages,
					totalItems
				},
			};
		}
		
		if (!Number.isNaN(limit) && limit > 0) {
			filtered = filtered.slice(0, limit);
		}
		
		return {data: filtered};
	}
	
	async getOne(id: string): Promise<INote> {
		const notes = await this._readFile();
		
		const note = notes.find((x: INote) => x.id === id);
		if (!note) {
			throw new NotFoundError("No note with id: " + id);
		}
		
		return note;
	}
	
	async create(body: IRequestBody): Promise<INote> {
		const content = body?.content?.trim()
		if (!content) {
			throw new BadRequestError("Content is required");
		}
		if (content.length > MAX_CONTENT_LENGTH) {
			throw new BadRequestError(
				`Content size should not be more than ${MAX_CONTENT_LENGTH} characters`
			);
		}
		
		const notes = await this._readFile();
		const note = {id: uuid(), content: content};
		notes.push(note);
		
		await this._writeFile(notes);
		return note;
	}
	
	async delete(id: string): Promise<INote> {
		const notes: INote[] = await this._readFile();
		
		const index = notes.findIndex((note: INote) => note.id === id);
		
		if (index === -1) {
			throw new NotFoundError("No note with id: " + id);
		}
		const [deleted] = notes.splice(index, 1);
		
		await this._writeFile(notes);
		
		return deleted;
	}
	
	async update(id: string, body: IRequestBody): Promise<INote> {
		const content = body?.content?.trim();
		if (!content) throw new BadRequestError("Content is required");
		if (content.length > MAX_CONTENT_LENGTH)
			throw new BadRequestError(
				`Content size should not be more than ${MAX_CONTENT_LENGTH} characters`
			);
		
		const notes = await this._readFile();
		const index = notes.findIndex(n => n.id === id);
		
		if (index === -1) throw new NotFoundError("No note with id: " + id);
		
		const note = notes[index];
		note.content = content;
		
		await this._writeFile(notes);
		return note;
	}
}

export const notesService = new NotesService();