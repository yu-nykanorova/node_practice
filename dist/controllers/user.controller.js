"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async getList(req, res, next) {
        try {
            const result = await user_service_1.userService.getList();
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const dto = req.body;
            const result = await user_service_1.userService.create(dto);
            res.status(201).json(result);
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const userId = Number(req.params.userId);
            const result = await user_service_1.userService.getById(userId);
            res.json(result);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
