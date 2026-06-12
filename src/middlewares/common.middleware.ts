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
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validateAsync(req.body);
        next();
      } catch (e: any) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }

  public isQueryValid(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        res.locals.query = await schema.validateAsync(req.query);
        next();
      } catch (e: any) {
        next(new ApiError(e.details[0].message, 400));
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
