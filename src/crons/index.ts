import { remindOldVisitCronJob } from "./remind-old-visit";
import { removeOldHashesCronJob } from "./remove-old-hashes";
import { removeOldTokensCronJob } from "./remove-old-tokens";

export const cronRunner = () => {
  removeOldTokensCronJob.start();
  removeOldHashesCronJob.start();
  remindOldVisitCronJob.start();
};
