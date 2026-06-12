import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type-enum";
import { ApiError } from "../errors/api-error";
import { ITokenPayload } from "../interfaces/token.interface";
import {
  IUser,
  IUserListQuery,
  IUserListResponse,
} from "../interfaces/user.interface";
import { userPresenter } from "../presenters/user.presenter";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(query: IUserListQuery): Promise<IUserListResponse> {
    const [entities, total] = await userRepository.getList(query);
    return userPresenter.toListResDto(entities, total, query);
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

  public async uploadAvatar(
    jwtPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id!,
    );

    const updatedUser = await userRepository.update(user._id!, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }

    if (!updatedUser) {
      throw new ApiError("User not found", 404);
    }

    return updatedUser;
  }

  public async deleteAvatar(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    if (!user.avatar) {
      throw new ApiError("Avatar not found", 404);
    }

    await s3Service.deleteFile(user.avatar);

    await userRepository.deleteField(user._id!, "avatar");
  }
}

export const userService = new UserService();
