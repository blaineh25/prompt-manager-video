import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
    schema: "./db/schema/prompts-schema.ts",
    out: "./db/migrations",
    dialect: "postgresql",
    dbCredentials: {
       url: connectionString,
    },
});
