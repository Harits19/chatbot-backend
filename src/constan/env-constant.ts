import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export const ENV = {
  MONGO_CLIENT: process.env.MONGO_CLIENT,
  BOT_NUMBER: process.env.BOT_NUMBER,
};
