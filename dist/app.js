"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_routes_1 = require("@notes/notes.routes");
const _middlewares_1 = require("@middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/notes", notes_routes_1.router);
app.use(_middlewares_1.errorHandler);
app.use((_req, res) => {
    res.status(404).json({ ok: false, message: "Route not found" });
});
exports.default = app;
