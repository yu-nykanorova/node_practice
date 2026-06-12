import { FileTypeEnum } from "../enums/file-type.enum";

export const fileConstants = {
  [FileTypeEnum.AVATAR]: {
    size: 5 * 1024 * 1024,
    mimetypes: ["image/webp", "image/png", "image/jpeg"],
  },
};
