"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const fs_service_1 = require("../services/fs.service");
class UserRepository {
    async getList() {
        return await (0, fs_service_1.read)();
    }
    async create(dto) {
        const users = await (0, fs_service_1.read)();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await (0, fs_service_1.write)(users);
        return newUser;
    }
    async getById(userId) {
        const users = await (0, fs_service_1.read)();
        return users.find((user) => user.id === userId);
    }
}
exports.userRepository = new UserRepository();
