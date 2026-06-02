import { MailDataRequired } from "@sendgrid/helpers/classes/mail";
import SendGrid from "@sendgrid/mail";

import { configs } from "../config/configs";
import { emailTemplateConstant } from "../constants/email-template.constant";
import { EmailTypeEnum } from "../enums/email-type.enum";

class SendGridService {
  constructor() {
    SendGrid.setApiKey(configs.SENDGRID_API_KEY);
  }

  public async sendByType(
    to: string,
    type: EmailTypeEnum,
    dynamicTemplateData: any,
  ): Promise<void> {
    try {
      const templateId = emailTemplateConstant[type].templateId;
      await this.send({
        from: configs.SENDGRID_FROM_EMAIL,
        to,
        templateId,
        dynamicTemplateData,
      });
    } catch (error) {
      console.error("Error email: ", error);
    }
  }

  private async send(email: MailDataRequired): Promise<void> {
    try {
      await SendGrid.send(email);
    } catch (error) {
      console.error("Error email: ", error);
    }
  }
}

export const sendGridService = new SendGridService();
