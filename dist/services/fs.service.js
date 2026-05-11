"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.read = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const read = async () => {
    try {
        const pathToFile = node_path_1.default.join(process.cwd(), "..", "db.json");
        const data = await promises_1.default.readFile(pathToFile, "utf8");
        return data ? JSON.parse(data) : [];
    }
    catch (e) {
        console.log("Reading error", e.message);
    }
};
exports.read = read;
const write = async (users) => {
    try {
        const pathToFile = node_path_1.default.join(process.cwd(), "..", "db.json");
        await promises_1.default.writeFile(pathToFile, JSON.stringify(users));
    }
    catch (e) {
        console.log("Writing error", e.message);
    }
};
exports.write = write;
