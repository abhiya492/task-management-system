import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // Changed from 'provider' to 'dialect'
  dbCredentials: {
    url: process.env.DATABASE_URL, // Changed from 'url' to 'connectionString'
  },
} satisfies Config;