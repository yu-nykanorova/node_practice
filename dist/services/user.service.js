"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const api_error_1 = require("../errors/api-error");
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    async getList() {
        return await user_repository_1.userRepository.getList();
    }
    async create(dto) {
        if (!dto.name || dto.name.length < 3) {
            throw new api_error_1.ApiError("Name is required and should be at least 3 characters long", 400);
        }
        if (!dto.email || !dto.email.includes("@")) {
            throw new api_error_1.ApiError("Email is required and should be valid", 400);
        }
        if (!dto.password || dto.password.length < 6) {
            throw new api_error_1.ApiError("Password is required and should be at least 6 characters long", 400);
        }
        const users = await user_repository_1.userRepository.getList();
        if (users.find((user) => user.email === dto.email)) {
            throw new api_error_1.ApiError("This email is already in use", 409);
        }
        return await user_repository_1.userRepository.create(dto);
    }
    async getById(userId) {
        if (Number.isNaN(userId)) {
            throw new api_error_1.ApiError("User id must be an integer", 400);
        }
        const user = await user_repository_1.userRepository.getById(userId);
        if (!user) {
            throw new api_error_1.ApiError("User not found", 404);
        }
        return user;
    }
}
exports.userService = new UserService();
