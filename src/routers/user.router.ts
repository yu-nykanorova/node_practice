import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { updateValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);
router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(updateValidator),

  userController.update,
);
router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.delete,
);

export const userRouter = router;
