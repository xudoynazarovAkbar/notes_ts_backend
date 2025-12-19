export class BadRequestError extends Error {
	status: number;
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		this.status = 400;
	}
}