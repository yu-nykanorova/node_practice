import * as bcrypt from "bcrypt";

import { ApiError } from "../errors/api-error";
import { IUser } from "../interfaces/user.interface";
import { oldHashesRepository } from "../repositories/old-hashes.repository";

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
    user: IUser,
  ): Promise<void> {
    const oldHashes = await oldHashesRepository.findByParams({
      _userId: user._id,
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
