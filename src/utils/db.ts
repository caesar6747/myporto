import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../models/schema.ts';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

const sqlite = new Database(
  './db.sqlite3'
);

export const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: './drizzle' });