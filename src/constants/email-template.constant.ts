import { EmailTypeEnum } from "../enums/email-type.enum";

export const emailTemplateConstant = {
  [EmailTypeEnum.WELCOME]: {
    templateId: "d-5e78daf0d2974d578eb0a0ab56b8e4fa",
  },
  [EmailTypeEnum.RESET_PASSWORD]: {
    templateId: "d-e0b581fdaf5a4274a9ad368b43e6b6d8",
  },
  [EmailTypeEnum.DELETE_ACCOUNT]: {
    templateId: "d-3cd2a96a0e6f40f6a4624a79866fa0cf",
  },
  [EmailTypeEnum.LOGOUT_ALL]: {
    templateId: " d-eb5c22fdfbad4f7ebc331490d467b00f",
  },
};
