import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { createValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/sign-up",
  commonMiddleware.isBodyValid(createValidator),
  authController.signUp,
);

router.post(
  "/sign-in",
  //commonMiddleware.isBodyValid(createValidator),
  authController.signIn,
);

export const authRouter = router;
