import { removeOldTokensCronJob } from "./remove-old-tokens";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
};
