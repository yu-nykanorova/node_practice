import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api-error";
import { IFile } from "../interfaces/file.interface";

class FileMiddleware {
  public isFileValid(fileData: IFile) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const file = req.files?.avatar as UploadedFile;

        if (!file) {
          throw new ApiError("File is required", 400);
        }

        if (file.size > fileData.size) {
          throw new ApiError(
            `File size must be less than ${fileData.size}`,
            400,
          );
        }

        if (!fileData.mimetypes.includes(file.mimetype)) {
          throw new ApiError("Invalid file type", 400);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const fileMiddleware = new FileMiddleware();
