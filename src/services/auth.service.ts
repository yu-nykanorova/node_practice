import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { ISignIn, IUser } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(
    dto: Partial<IUser>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    if (!dto.password || !dto.email) {
      throw new ApiError("Password or email is required", 400);
    }

    await this.isEmailExistOrThrow(dto.email);

    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });

    const tokens = tokenService.generateTokens({
      userId: user._id!,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });

    await emailService.sendMail(
      EmailTypeEnum.WELCOME,
      "juliyasos88@gmail.com",
      { name: user.name },
    );

    return { user, tokens };
  }

  public async signIn(
    dto: ISignIn,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User does not exist", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Wrong password", 401);
    }

    const tokens = tokenService.generateTokens({
      userId: user._id!,
      role: user.role,
    });

    await tokenRepository.create({ ...tokens, _userId: user._id });

    return { user, tokens };
  }

  public async refresh(
    refreshToken: string,
    jwtPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteByUserId(jwtPayload.userId);

    const tokens = tokenService.generateTokens({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });

    await tokenRepository.create({ ...tokens, _userId: jwtPayload.userId });

    return tokens;
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("This email already exists", 409);
    }
  }
}

export const authService = new AuthService();
