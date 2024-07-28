import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig ({
    schema: "./schema.ts",
    out: "./migrations",
    driver: "better-sqlite",
    dbCredentials: {
        url: "./local.db",
    },
    verbose: true,
    strict: true,
})