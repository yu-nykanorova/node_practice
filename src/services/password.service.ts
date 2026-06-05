import * as bcrypt from "bcrypt";

import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { ApiError } from "../errors/api-error";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";

class PasswordService {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async checkPasswordsEquality(
    newPassword: string,
    userId: string,
  ): Promise<boolean> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }
    const oldHashes = await oldHashesRepository.findByParams({
      _userId: userId,
    });

    const isCurrentPassword = await this.comparePassword(
      newPassword,
      user.password,
    );

    for (const oldHash of oldHashes) {
      const isPasswordEqual = await passwordService.comparePassword(
        dto.password,
        oldHash.hash,
      );

      if (isPasswordEqual) {
        throw new ApiError(
          "New password must differ from the previous one",
          401,
        );
      }
    }
  }
}

export const passwordService = new PasswordService();
