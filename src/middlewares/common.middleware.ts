import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api-error";

class CommonMiddleware {
  public isIdValid(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!isObjectIdOrHexString(req.params[key])) {
          throw new ApiError("Not a valid id", 404);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isBodyValid(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const validationError = schema.validate(req.body).error;
        if (validationError) {
          throw new ApiError(validationError.message, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
