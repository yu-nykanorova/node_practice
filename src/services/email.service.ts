import path from "node:path";

import nodemailer, { Transporter } from "nodemailer";
import HbsTransporter from "nodemailer-express-handlebars";

import { configs } from "../config/configs";
import { emailConstants } from "../constants/email.constants";
import { EmailTypeEnum } from "../enums/email-type.enum";
import {EmailTypeToPayload} from "../types/email-type-to-payload.type";

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      from: "No reply",
      auth: {
        user: configs.SMTP_EMAIL,
        pass: configs.SMTP_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.join(process.cwd(), "src", "templates", "partials"),
        layoutsDir: path.join(process.cwd(), "src", "templates", "layouts"),
        defaultLayout: "",
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", HbsTransporter(hbsOptions));
  }

  public async sendMail<T extends EmailTypeEnum>(
    type: T,
    to: string,
    context: EmailTypeToPayload[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type];

    const options = {
      // from: configs.SMTP_EMAIL,
      to,
      subject,
      // html: "This is a test email",
      template,
      context,
    };

    await this.transporter.sendMail(options);
  }
}

export const emailService = new EmailService();
