import { remindOldVisitCronJob } from "./remind-old-visit";
import { removeOldHashesCronJob } from "./remove-old-hashes";
import { removeOldTokensCronJob } from "./remove-old-tokens";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldHashesCronJob.start();
  remindOldVisitCronJob.start();
};
