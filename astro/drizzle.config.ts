import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/models/schema.ts',
  out: './drizzle',
  driver: 'better-sqlite',
  dbCredentials: {
    url:'./db/sqlite3'
      // process.env.NODE_ENV === 'production'
      //   ? '/data/db.sqlite3'
      //   : './db.sqlite3'
  }
} satisfies Config;