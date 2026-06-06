import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return user;
  }

  public async updateMe(
    jwtPayload: ITokenPayload,
    dto: Partial<IUser>,
  ): Promise<IUser> {
    const updatedUser = await userRepository.update(jwtPayload.userId, dto);

    if (!updatedUser) {
      throw new ApiError("User not found", 404);
    }

    return updatedUser;
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    await userRepository.delete(jwtPayload.userId);
    await tokenRepository.deleteAllByParams({ _userId: jwtPayload.userId });
    await oldHashesRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
    });
  }
}

export const userService = new UserService();

// hash password
//
// public async create(dto: Partial<IUser>): Promise<IUser> {
//   const users = await userRepository.getList();
//
//   if (users.find((user) => user.email === dto.email)) {
//   throw new ApiError("This email is already in use", 409);
// }
//
// if (!dto.password) {
//   throw new ApiError("Password is required", 400);
// }
//
// const password = await passwordService.hashPassword(dto.password);
//
// return await userRepository.create({ ...dto, password });
