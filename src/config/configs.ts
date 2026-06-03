import dotenv from "dotenv";

dotenv.config();

function checkEnv(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Absent environment variable ${name}`);
  }
  return value;
}

export const configs = {
  APP_PORT: checkEnv(process.env.APP_PORT, "APP_PORT") || 3001,
  APP_HOST: checkEnv(process.env.APP_HOST, "APP_HOST"),
  APP_FRONT_URL: checkEnv(process.env.APP_FRONT_URL, "APP_FRONT_URL"),

  MONGO_URI: checkEnv(process.env.MONGO_URI, "MONGO_URI"),

  JWT_ACCESS_SECRET: checkEnv(
    process.env.JWT_ACCESS_SECRET,
    "JWT_ACCESS_SECRET",
  ),
  JWT_ACCESS_EXPIRATION: checkEnv(
    process.env.JWT_ACCESS_EXPIRATION,
    "JWT_ACCESS_EXPIRATION",
  ),
  JWT_REFRESH_SECRET: checkEnv(
    process.env.JWT_REFRESH_SECRET,
    "JWT_REFRESH_SECRET",
  ),
  JWT_REFRESH_EXPIRATION: checkEnv(
    process.env.JWT_REFRESH_EXPIRATION,
    "JWT_REFRESH_EXPIRATION",
  ),

  ACTION_FORGOT_PASSWORD_SECRET: checkEnv(
    process.env.ACTION_FORGOT_PASSWORD_SECRET,
    "ACTION_FORGOT_PASSWORD_SECRET",
  ),
  ACTION_FORGOT_PASSWORD_EXPIRATION: checkEnv(
    process.env.ACTION_FORGOT_PASSWORD_EXPIRATION,
    "ACTION_FORGOT_PASSWORD_EXPIRATION",
  ),
  ACTION_VERIFY_EMAIL_SECRET: checkEnv(
    process.env.ACTION_VERIFY_EMAIL_SECRET,
    "ACTION_VERIFY_EMAIL_SECRET",
  ),
  ACTION_VERIFY_EMAIL_EXPIRATION: checkEnv(
    process.env.ACTION_VERIFY_EMAIL_EXPIRATION,
    "ACTION_VERIFY_EMAIL_EXPIRATION",
  ),

  SMTP_EMAIL: checkEnv(process.env.SMTP_EMAIL, "EMAIL"),
  SMTP_PASSWORD: checkEnv(process.env.SMTP_PASSWORD, "PASSWORD"),
};
