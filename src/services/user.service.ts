import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(dto: Partial<IUser>): Promise<IUser> {
    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }

    const users = await userRepository.getList();

    if (users.find((user) => user.email === dto.email)) {
      throw new ApiError("This email is already in use", 409);
    }

    return await userRepository.create(dto);
  }

  public async getById(userId: number): Promise<IUser> {
    if (Number.isNaN(userId)) {
      throw new ApiError("User id must be an integer", 400);
    }

    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async update(userId: number, dto: Partial<IUser>): Promise<IUser> {
    if (Number.isNaN(userId)) {
      throw new ApiError("User id must be an integer", 400);
    }

    const users = await userRepository.getList();

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      throw new ApiError("User not found", 404);
    }

    if (!dto.name || dto.name.length < 3) {
      throw new ApiError(
        "Name is required and should be at least 3 characters long",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required and should be valid", 400);
    }
    if (!dto.password || dto.password.length < 6) {
      throw new ApiError(
        "Password is required and should be at least 6 characters long",
        400,
      );
    }

    return await userRepository.update(userIndex, dto);
  }

  public async delete(userId: number): Promise<void> {
    if (Number.isNaN(userId)) {
      throw new ApiError("User id must be an integer", 400);
    }

    const users = await userRepository.getList();

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      throw new ApiError("User not found", 404);
    }

    return await userRepository.delete(userIndex);
  }
}

export const userService = new UserService();
