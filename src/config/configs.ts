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
  MONGO_URI: checkEnv(process.env.MONGO_URI, "MONGO_URI"),

  FRONT_URL: checkEnv(process.env.FRONT_URL, "FRONT_URL"),

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

  SMTP_EMAIL: checkEnv(process.env.SMTP_EMAIL, "EMAIL"),
  SMTP_PASSWORD: checkEnv(process.env.SMTP_PASSWORD, "PASSWORD"),

  SENDGRID_API_KEY: checkEnv(process.env.SENDGRID_API_KEY, "SENDGRID_API_KEY"),
  SENDGRID_FROM_EMAIL: checkEnv(
    process.env.SENDGRID_FROM_EMAIL,
    "SENDGRID_FROM_EMAIL",
  ),
};
