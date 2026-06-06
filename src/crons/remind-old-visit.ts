import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(7, "days");

    const users = await userRepository.getByOldLoginDate(date);

    await Promise.all(
      users.map(async (user) => {
        await emailService.sendMail(EmailTypeEnum.OLD_VISIT, user.email, {
          name: user.name,
        });
      }),
    );
    console.log(`${users.length} letters have been sent`);
    console.log(
      users.map((u) => ({
        email: u.email,
        lastLogin: (u as any).lastLogin,
      })),
    );
  } catch (error) {
    console.error(error);
  }
};

export const remindOldVisitCronJob = new CronJob("0,20,40 * * * * *", handler);
