import {NextFunction, Request, Response} from "express";

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	let status: number;
	
	switch (err.name) {
		case 'BadRequestError':
			status = 400;
			break;
		case 'NotFoundError':
			status = 404
			break;
		default:
			status = 500;
	}
	
	res.status(status).json({
		ok: false,
		message: err.message || "Internal Server Error",
	});
}