import { EmailTypeEnum } from "../enums/email-type.enum";
import { EmailCombinedPayloadType } from "./email-combined-payload.type";
import { PickRequiredType } from "./pick-required.type";

export type EmailTypeToPayload = {
  [EmailTypeEnum.WELCOME]: PickRequiredType<
    EmailCombinedPayloadType,
    "name" | "frontUrl" | "actionToken"
  >;
  [EmailTypeEnum.RESET_PASSWORD]: PickRequiredType<
    EmailCombinedPayloadType,
    "frontUrl" | "actionToken"
  >;
  [EmailTypeEnum.DELETE_ACCOUNT]: PickRequiredType<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
  [EmailTypeEnum.LOGOUT_ALL]: PickRequiredType<
    EmailCombinedPayloadType,
    "name" | "frontUrl"
  >;
};
