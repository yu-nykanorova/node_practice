import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IResetPasswordSend,
  IResetPasswordSet,
  ISignIn,
  IUser,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { oldHashesRepository } from "../repositories/old-hashes.repository";
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

    await oldHashesRepository.create({
      _userId: user._id!,
      hash: password,
    });

    const tokens = tokenService.generateTokens({
      userId: user._id!,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });

    const actionToken = tokenService.generateActionTokens(
      { userId: user._id!, role: user.role },
      ActionTokenTypeEnum.VERIFY_EMAIL,
    );

    await actionTokenRepository.create({
      token: actionToken,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
      _userId: user._id,
    });

    await emailService.sendMail(EmailTypeEnum.WELCOME, user.email, {
      name: user.name,
      actionToken,
    });

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
    await tokenRepository.deleteTokenPair(refreshToken);

    const tokens = tokenService.generateTokens({
      userId: jwtPayload.userId,
      role: jwtPayload.role,
    });

    await tokenRepository.create({ ...tokens, _userId: jwtPayload.userId });

    return tokens;
  }

  public async logout(refreshToken: string): Promise<void> {
    await tokenRepository.deleteTokenPair(refreshToken);
  }

  public async logoutAll(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    await tokenRepository.deleteAllByParams({ _userId: jwtPayload.userId });

    await emailService.sendMail(
      EmailTypeEnum.LOGOUT_ALL,
      "juliyasos88@gmail.com",
      { name: user.name },
    );
  }

  private async isEmailExistOrThrow(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("This email already exists", 409);
    }
  }

  public async forgotPasswordSendEmail(dto: IResetPasswordSend): Promise<void> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const token = tokenService.generateActionTokens(
      { userId: user._id!, role: user.role },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );

    await actionTokenRepository.create({
      token,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
      _userId: user._id,
    });

    await emailService.sendMail(EmailTypeEnum.FORGOT_PASSWORD, user.email, {
      name: user.name,
      email: user.email,
      actionToken: token,
    });
  }

  public async forgotPasswordSet(
    dto: IResetPasswordSet,
    jwtPayload: ITokenPayload,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    await passwordService.checkPasswordsEquality(dto.password, user);

    const newPassword = await passwordService.hashPassword(dto.password);

    await userRepository.update(jwtPayload.userId, { password: newPassword });

    await oldHashesRepository.create({
      _userId: jwtPayload.userId,
      hash: newPassword,
    });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });

    await tokenRepository.deleteAllByParams({ _userId: jwtPayload.userId });
  }

  public async verifyEmail(jwtPayload: ITokenPayload): Promise<void> {
    await userRepository.update(jwtPayload.userId, { isVerified: true });

    await actionTokenRepository.deleteManyByParams({
      _userId: jwtPayload.userId,
      type: ActionTokenTypeEnum.VERIFY_EMAIL,
    });
  }

  public async changePassword(
    jwtPayload: ITokenPayload,
    dto: IChangePassword,
  ): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isPasswordCorrect = await passwordService.comparePassword(
      dto.oldPassword,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new ApiError("Wrong previous password", 401);
    }

    await passwordService.checkPasswordsEquality(dto.password, user);

    const password = await passwordService.hashPassword(dto.password);

    await userRepository.update(jwtPayload.userId, { password });

    await oldHashesRepository.create({
      _userId: jwtPayload.userId,
      hash: password,
    });

    await tokenRepository.deleteAllByParams({ _userId: jwtPayload.userId });
  }
}

export const authService = new AuthService();
