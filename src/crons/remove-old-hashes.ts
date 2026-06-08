import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldHashesRepository } from "../repositories/old-hashes.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(180, "days");
    const deletedCount = await oldHashesRepository.deleteOlderThan(date);
    console.log(`Deleted: ${deletedCount} old passwords hashes`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldHashesCronJob = new CronJob("0 0 * * *", handler);
