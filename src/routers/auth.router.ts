import {Router} from "express";

import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {commonMiddleware} from "../middlewares/common.middleware";
import {createValidator, signInValidator} from "../validators/user.validator";
import {ActionTokenTypeEnum} from "../enums/action-token-type.enum";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(createValidator),
  authController.signUp,
);

router.post(
  "/sign-in",
  commonMiddleware.isBodyValid(signInValidator),
  authController.signIn,
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.post("/logout", authMiddleware.checkRefreshToken, authController.logout);

router.post(
  "/logout-all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);

router.post("/forgot-password", authController.forgotPasswordSendEmail);

router.put(
  "/forgot-password",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  authController.forgotPasswordSet,
);

router.put(
  "/verify-email",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.VERIFY_EMAIL),
  authController.verifyEmail,
);

export const authRouter = router;
