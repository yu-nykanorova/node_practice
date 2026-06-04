import { CronJob } from "cron";

const handler = async () => {
  console.log("Test cron start");
};

export const testCronJob = new CronJob("* 1 * * * *", handler);
