"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    let status;
    switch (err.name) {
        case 'BadRequestError':
            status = 400;
            break;
        case 'NotFoundError':
            status = 404;
            break;
        default:
            status = 500;
    }
    res.status(status).json({
        ok: false,
        message: err.message || "Internal Server Error",
    });
}
