import * as bcrypt from "bcrypt";

import { ApiError } from "../errors/api-error";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
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
  ): Promise<void> {
    const user = await userRepository.getById(userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isCurrentPassword = await this.comparePassword(
      newPassword,
      user.password,
    );

    if (isCurrentPassword) {
      throw new ApiError("New password must differ from the previous one", 400);
    }

    const oldHashes = await oldHashesRepository.findByParams({
      _userId: userId,
    });

    if (oldHashes) {
      for (const oldHash of oldHashes) {
        const isPasswordEqual = await passwordService.comparePassword(
          newPassword,
          oldHash.hash,
        );

        if (isPasswordEqual) {
          throw new ApiError(
            "New password must differ from the previous one",
            400,
          );
        }
      }
    }
  }
}

export const passwordService = new PasswordService();
