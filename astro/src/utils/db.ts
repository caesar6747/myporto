import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../models/schema.js';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';

// const sqlite = new Database(
//   import.meta.env.PROD ? '/data/db.sqlite3' : './db.sqlite3'
// );
const sqlite = new Database('./db.sqlite3');

const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: './drizzle' });

export default db